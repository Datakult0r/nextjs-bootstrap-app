declare module "tailwindcss/lib/util/flattenColorPalette" {
    // Define the type for the function if known, otherwise use `any`
    const flattenColorPalette: (colors: Record<string, string | Record<string, string>>) => Record<string, string>;
    export default flattenColorPalette;
}