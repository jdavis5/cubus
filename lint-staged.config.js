import path from 'node:path'

/**
 * Creates a `next lint` command that targets specified files
 *
 * {@link https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged}
 *
 * @param {Array<string>} filenames
 * @returns {string}
 */
const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`

/**
 * @type {import('lint-staged/lib').Configuration}
 */
const lintStagedConfig = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '*': 'prettier --write --ignore-unknown'
}

export default lintStagedConfig
