'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// ponytail: import SwaggerUI dynamically since it requires browser window object
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const spec = {
  openapi: '3.0.0',
  info: {
    title: 'SynchroTech License Server API',
    description: 'API documentation for desktop telemetry license management system integration.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://synchrotech.site/api/v1',
      description: 'Production server (synchrotech.site)',
    },
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development server (localhost)',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
      },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  paths: {
    '/license/activate': {
      post: {
        summary: 'Activate a software license on a device',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['licenseKey', 'deviceId', 'deviceName', 'windowsUsername'],
                properties: {
                  licenseKey: { type: 'string', example: 'SYNC-ABC-HRO-1234' },
                  deviceId: { type: 'string', example: 'E1D2C3B4' },
                  deviceName: { type: 'string', example: 'TEAM-A-PC' },
                  windowsUsername: { type: 'string', example: 'Operator' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successful activation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'License activated' },
                    license: {
                      type: 'object',
                      properties: {
                        key: { type: 'string' },
                        customer: { type: 'string' },
                        maxDevices: { type: 'integer' },
                        expiredAt: { type: 'string', format: 'date-time' },
                        nextValidation: { type: 'string', format: 'date-time' },
                      },
                    },
                    token: { type: 'string', example: 'encrypted-license-token' },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid API Key' },
          403: { description: 'License Revoked' },
          404: { description: 'License Not Found' },
          409: { description: 'Max Devices Reached' },
        },
      },
    },
    '/license/validate': {
      post: {
        summary: 'Perform periodic license validation',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['licenseKey', 'deviceId', 'token'],
                properties: {
                  licenseKey: { type: 'string', example: 'SYNC-ABC-HRO-1234' },
                  deviceId: { type: 'string', example: 'E1D2C3B4' },
                  token: { type: 'string', example: 'encrypted-license-token' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'License is valid',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    nextValidation: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid API Key or token' },
          403: { description: 'License Revoked' },
          404: { description: 'License Not Found' },
        },
      },
    },
    '/license/info': {
      post: {
        summary: 'Fetch license details metadata',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['licenseKey'],
                properties: {
                  licenseKey: { type: 'string', example: 'SYNC-ABC-HRO-1234' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'License information details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    customer: { type: 'string' },
                    status: { type: 'string' },
                    expiredAt: { type: 'string', format: 'date' },
                    maxDevices: { type: 'integer' },
                    activeDevices: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default function DocsPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '20px' }}>
      <SwaggerUI spec={spec} />
    </div>
  );
}
