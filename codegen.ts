import type { CodegenConfig } from '@graphql-codegen/cli';

const tenantIdentifier = process.env.CRYSTALLIZE_TENANT_IDENTIFIER;

const config: CodegenConfig = {
    schema: `https://api.crystallize.com/${tenantIdentifier}/discovery`,
    documents: ['app/**/*.graphql', 'components/**/*.graphql'],
    ignoreNoDocuments: true,
    overwrite: true,
    config: {
        avoidOptionals: true,
    },
    generates: {
        'generated/': {
            preset: 'client',
            presetConfig: { fragmentMasking: false },
            plugins: [{ add: { content: '//@ts-nocheck' } }],
        },
    },
};

export default config;
