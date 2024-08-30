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

const config = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '*.{json,css,scss,md}': 'prettier --write'
}

export default config
