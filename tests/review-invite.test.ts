import assert from "node:assert/strict";
import { before, beforeEach, describe, test } from "node:test";

/** The shared limit behind both review invitations, against in-memory storage. */

class MemoryStorage {
  private items = new Map<string, string>();
  getItem(key: string) {
    return this.items.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.items.set(key, value);
  }
  clear() {
    this.items.clear();
  }
}

const local = new MemoryStorage();
const session = new MemoryStorage();
Object.assign(globalThis, { window: { localStorage: local, sessionStorage: session } });

let invite: typeof import("@/lib/review-invite");
before(async () => {
  invite = await import("@/lib/review-invite");
});

beforeEach(() => {
  local.clear();
  session.clear();
});

describe("review invitation limit", () => {
  test("a new visitor may be invited, but isn't engaged on their first page", () => {
    assert.equal(invite.inviteAllowed(), true);
    assert.equal(invite.isEngaged(invite.notePageView()), false);
  });

  test("engaged on the second page, or after finishing an article before", () => {
    invite.notePageView();
    assert.equal(invite.isEngaged(invite.notePageView()), true);
    session.clear();
    invite.noteArticleFinished();
    assert.equal(invite.isEngaged(invite.notePageView()), true);
  });

  test("one surface per visit", () => {
    invite.markShown("card");
    assert.equal(invite.shownThisVisit("card"), true);
    invite.markShown("float");
    assert.equal(invite.shownThisVisit("float"), false, "the first surface keeps the visit");
  });

  test("dismissal hides invitations for 60 days", () => {
    invite.markDismissed();
    assert.equal(invite.inviteAllowed(), false);
    const stored = JSON.parse(local.getItem("space:review-invite") ?? "{}");
    local.setItem(
      "space:review-invite",
      JSON.stringify({ ...stored, dismissedAt: Date.now() - 61 * 86_400_000 }),
    );
    assert.equal(invite.inviteAllowed(), true);
  });

  test("after a submission, never again", () => {
    invite.markSubmitted();
    assert.equal(invite.inviteAllowed(), false);
    assert.equal(invite.hasSubmitted(), true);
  });

  test("corrupt or unavailable storage means no error", () => {
    local.setItem("space:review-invite", "{not json");
    assert.equal(invite.inviteAllowed(), true);
    local.setItem = () => {
      throw new Error("blocked");
    };
    assert.doesNotThrow(() => invite.markDismissed());
  });

  test("star links carry the rating into the form", () => {
    assert.equal(invite.reviewHref(4), "/reviews?rating=4#write");
    assert.equal(invite.reviewHref(), "/reviews#write");
  });
});
