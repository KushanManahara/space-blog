import { z } from "zod";

/**
 * Zod schemas for external Vercel REST API payloads and multi-project JSON configuration.
 *
 * Unknown properties are ignored by default in Zod v4 so Vercel adding new response fields
 * will never break cleanup, while every field our safety logic relies on is validated strictly.
 */

const paginationCursorSchema = z
  .union([z.number(), z.string(), z.null()])
  .optional()
  .transform((value) => {
    if (value === null || value === undefined || value === "") return null;
    return String(value);
  });

export const paginationSchema = z
  .object({
    count: z.union([z.number(), z.string()]).optional(),
    next: paginationCursorSchema,
    prev: paginationCursorSchema,
  })
  .optional();

/**
 * Schema for deployment items returned by `GET /v6/deployments`.
 * Note: `createdAt` or legacy `created` may be populated depending on API version/deployment age.
 */
export const vercelListDeploymentItemSchema = z
  .object({
    uid: z.string().min(1),
    name: z.string().optional(),
    url: z.string().optional(),
    created: z.number().finite().optional(),
    createdAt: z.number().finite().optional(),
    state: z.string().optional(),
    readyState: z.string().optional(),
    target: z.string().nullable().optional(),
    aliasAssigned: z.union([z.number(), z.boolean(), z.null()]).optional(),
    isRollbackCandidate: z.boolean().nullable().optional(),
    inspectorUrl: z.string().nullable().optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
  })
  .transform((item) => ({
    uid: item.uid,
    name: item.name,
    url: item.url,
    createdAt: item.createdAt ?? item.created,
    state: item.state,
    readyState: item.readyState,
    target: item.target,
    aliasAssigned: item.aliasAssigned,
    isRollbackCandidate: item.isRollbackCandidate,
    inspectorUrl: item.inspectorUrl,
    meta: item.meta,
  }));

export const listDeploymentsResponseSchema = z.object({
  deployments: z.array(vercelListDeploymentItemSchema),
  pagination: paginationSchema,
});

/**
 * Schema for `GET /v13/deployments/{idOrUrl}`.
 */
export const getDeploymentResponseSchema = z
  .object({
    id: z.string().min(1).optional(),
    uid: z.string().min(1).optional(),
    name: z.string().optional(),
    url: z.string().optional(),
    createdAt: z.number().finite().optional(),
    created: z.number().finite().optional(),
    readyState: z.string().optional(),
    status: z.string().optional(),
    state: z.string().optional(),
    target: z.string().nullable().optional(),
    alias: z.array(z.string()).optional(),
    aliasAssigned: z.union([z.number(), z.boolean(), z.null()]).optional(),
    isRollbackCandidate: z.boolean().nullable().optional(),
  })
  .refine((value) => Boolean(value.id ?? value.uid), {
    message: "Deployment detail response must include id or uid",
  })
  .transform((value) => ({
    uid: value.id ?? value.uid ?? "",
    name: value.name,
    url: value.url,
    createdAt: value.createdAt ?? value.created,
    readyState: value.readyState ?? value.status ?? value.state,
    target: value.target,
    aliases: value.alias ?? [],
    aliasAssigned: value.aliasAssigned,
    isRollbackCandidate: value.isRollbackCandidate,
  }));

/**
 * Schema for `DELETE /v13/deployments/{id}`.
 */
export const deleteDeploymentResponseSchema = z.object({
  uid: z.string().min(1),
  state: z.string().min(1),
});

/**
 * Schema for `GET /v4/aliases`.
 */
export const vercelAliasItemSchema = z
  .object({
    uid: z.string().min(1),
    alias: z.string().min(1),
    deploymentId: z.string().nullable().optional(),
    projectId: z.string().nullable().optional(),
    created: z.string().optional(),
    deployment: z
      .object({
        id: z.string().min(1),
      })
      .nullable()
      .optional(),
  })
  .transform((item) => ({
    uid: item.uid,
    alias: item.alias.toLowerCase(),
    deploymentId: item.deploymentId ?? item.deployment?.id ?? null,
    projectId: item.projectId ?? null,
    created: item.created,
  }));

export const listAliasesResponseSchema = z.object({
  aliases: z.array(vercelAliasItemSchema),
  pagination: paginationSchema,
});

/**
 * Schema for `GET /v2/deployments/{id}/aliases`.
 */
export const deploymentAliasesResponseSchema = z.object({
  aliases: z.array(
    z.object({
      uid: z.string().min(1),
      alias: z.string().min(1),
      created: z.string().optional(),
      redirect: z.string().nullable().optional(),
    }),
  ),
});

/**
 * Schema for `GET /v9/projects/{idOrName}/domains`.
 */
export const projectDomainSchema = z.object({
  name: z
    .string()
    .min(1)
    .transform((value) => value.toLowerCase()),
  gitBranch: z.string().nullable().optional(),
  customEnvironmentId: z.string().nullable().optional(),
  redirect: z.string().nullable().optional(),
  verified: z.boolean().optional(),
});

export const listProjectDomainsResponseSchema = z.object({
  domains: z.array(projectDomainSchema),
  pagination: paginationSchema,
});

/**
 * Schema for `GET /v9/projects/{idOrName}`.
 */
const projectTargetEntrySchema = z
  .object({
    id: z.string().min(1),
    alias: z.array(z.string()).optional(),
    readyState: z.string().optional(),
  })
  .nullable();

const projectAliasEntrySchema = z.union([
  z.string().min(1),
  z.object({
    domain: z.string().min(1).optional(),
    alias: z.string().min(1).optional(),
  }),
]);

const customEnvironmentSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  domains: z
    .array(
      z.union([
        z.string().min(1),
        z.object({
          name: z.string().min(1),
        }),
      ]),
    )
    .optional(),
});

export const getProjectResponseSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    link: z
      .object({
        productionBranch: z.string().min(1).optional(),
      })
      .nullable()
      .optional(),
    targets: z.record(z.string(), projectTargetEntrySchema).nullable().optional(),
    alias: z.array(projectAliasEntrySchema).optional(),
    customEnvironments: z.array(customEnvironmentSchema).optional(),
  })
  .transform((project) => {
    const targets: Record<string, { id: string; alias: string[]; readyState?: string }> = {};
    if (project.targets) {
      for (const [key, entry] of Object.entries(project.targets)) {
        if (entry) {
          targets[key] = {
            id: entry.id,
            alias: (entry.alias ?? []).map((a) => a.toLowerCase()),
            readyState: entry.readyState,
          };
        }
      }
    }

    const projectAliases: string[] = [];
    for (const entry of project.alias ?? []) {
      if (typeof entry === "string") {
        projectAliases.push(entry.toLowerCase());
      } else {
        const domain = entry.domain ?? entry.alias;
        if (domain) projectAliases.push(domain.toLowerCase());
      }
    }

    const customEnvironmentDomains: string[] = [];
    for (const env of project.customEnvironments ?? []) {
      for (const domainEntry of env.domains ?? []) {
        if (typeof domainEntry === "string") {
          customEnvironmentDomains.push(domainEntry.toLowerCase());
        } else {
          customEnvironmentDomains.push(domainEntry.name.toLowerCase());
        }
      }
    }

    return {
      id: project.id,
      name: project.name,
      productionBranch: project.link?.productionBranch,
      targets,
      projectAliases,
      customEnvironmentDomains,
    };
  });

/**
 * Schema for optional `VERCEL_PROJECTS_JSON` multi-project configuration.
 */
export const projectsJsonConfigSchema = z
  .array(
    z.object({
      id: z.string().trim().min(1, "Each project entry must have a non-empty id or name"),
      teamId: z.string().trim().min(1).optional(),
      keepLastN: z.number().int().min(1).max(1000).optional(),
      minProductionDeployments: z.number().int().min(1).max(100).optional(),
      minAgeMinutes: z.number().int().min(0).max(525_600).optional(),
      protectAllAliases: z.boolean().optional(),
      maxDeletionsPerRun: z.number().int().min(1).max(1000).optional(),
    }),
  )
  .min(1, "VERCEL_PROJECTS_JSON must contain at least one project");
