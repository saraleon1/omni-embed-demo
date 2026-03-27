/*
 * This file is the server-side API route for generating signed Omni embed URLs.
 * It receives user/config data from the frontend, validates the request, and calls the SDK wrapper in lib/omni-embed.ts to generate a signed URL.
 * Secrets and sensitive logic are kept server-side—never exposed to the client.
 * See the README section 'How the Main Files Work Together' for an overview of the architecture and data flow.
 * This file is separate from omni-embed.ts to keep API route handling and SDK logic decoupled (separation of concerns).
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { generateEmbedUrl } from '@/lib/omni-embed';
import { OmniEmbedConfig, OmniUser, OmniError } from '@/types/omni';
import { EmbedSessionMode } from '@omni-co/embed';

type SuccessResponse = {
  success: true;
  data: {
    url: string;
  };
};

type ErrorResponse = {
  success: false;
  error: OmniError;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Only POST requests are allowed',
      },
    });
  }

  try {
    const { config, user } = req.body as {
      config: OmniEmbedConfig;
      user: OmniUser;
    };
    const hasContentId = typeof config?.contentId === 'string' && config.contentId.length > 0;

    // Validate required fields
    if (!config || (!hasContentId && config.contentType !== 'content-discovery')) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Missing required field: config.contentId',
        },
      });
    }

    if (!user || !user.externalId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_REQUEST',
          message: 'Missing required field: user.externalId',
        },
      });
    }

    // Generate signed URL using the SDK
    let url: string;
    if (config.contentType === 'navigation') {
      if (typeof config.contentId !== 'string' || config.contentId.length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Missing required field: config.contentId',
          },
        });
      }
      const contentId = config.contentId;

      // Navigation demo: embed full app navigation
      url = await generateEmbedUrl({
        contentId,
        contentType: 'dashboard', // Use dashboard for SDK, but set mode
        externalId: user.externalId,
        name: user.name || user.externalId,
        email: user.email,
        entity: typeof user.attributes?.entity === 'string' ? user.attributes.entity : undefined,
        theme: config.theme,
        prefersDark: config.prefersDark,
        filterSearchParam: config.filterSearchParam,
        userAttributes: user.attributes,
        connectionRoles: config.connectionRoles,
        linkAccess: config.linkAccess,
        accessBoost: config.accessBoost,
        customTheme: config.customTheme,
        customThemeId: config.customThemeId,
        mode: EmbedSessionMode.Application, // Use enum value for type safety
      });
    } else if (config.contentType === 'content-discovery') {
      // Hub (Home Page) demo: embed content discovery at root
      url = await generateEmbedUrl({
        contentType: 'content-discovery',
        path: typeof config.path === 'string' ? config.path : 'root',
        externalId: user.externalId,
        name: user.name || user.externalId,
        email: user.email,
        entity: typeof user.attributes?.entity === 'string' ? user.attributes.entity : undefined,
        theme: config.theme,
        prefersDark: config.prefersDark,
        filterSearchParam: config.filterSearchParam,
        userAttributes: user.attributes,
        connectionRoles: config.connectionRoles,
        linkAccess: config.linkAccess,
        accessBoost: config.accessBoost,
        customTheme: config.customTheme,
        customThemeId: config.customThemeId,
      });
    } else {
      if (typeof config.contentId !== 'string' || config.contentId.length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Missing required field: config.contentId',
          },
        });
      }
      const contentId = config.contentId;

      url = await generateEmbedUrl({
        contentId,
        contentType: config.contentType || 'dashboard',
        externalId: user.externalId,
        name: user.name || user.externalId,
        email: user.email,
        entity: typeof user.attributes?.entity === 'string' ? user.attributes.entity : undefined,
        theme: config.theme,
        prefersDark: config.prefersDark,
        filterSearchParam: config.filterSearchParam,
        userAttributes: user.attributes,
        connectionRoles: config.connectionRoles,
        linkAccess: config.linkAccess,
        accessBoost: config.accessBoost,
        customTheme: config.customTheme,
        customThemeId: config.customThemeId,
        mode: config.mode === 'APPLICATION' ? EmbedSessionMode.Application : undefined,
      });
    }

    return res.status(200).json({
      success: true,
      data: { url },
    });
  } catch (error) {
    console.error('Error generating embed URL:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('environment variable')) {
        return res.status(500).json({
          success: false,
          error: {
            code: 'CONFIGURATION_ERROR',
            message: 'Server configuration error. Please contact support.',
          },
        });
      }
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    });
  }
} 
