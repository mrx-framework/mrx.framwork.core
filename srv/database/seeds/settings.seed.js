module.exports = async ({ Settings }) => {
  return await Settings.bulkCreate([
    { key: "app_locale", value: "en" },
    { key: "app_theme", value: "default" },
    { key: "app_blog_path", value: "/blog" },
    { key: "theme_color_primary", value: "#8ba21d" },
    { key: "theme_color_secondary", value: "#424242" },
    { key: "theme_color_accent", value: "#82B1FF" },
    { key: "theme_color_error", value: "#FF5252" },
    { key: "theme_color_info", value: "#2196F3" },
    { key: "theme_color_success", value: "#4CAF50" },
    { key: "theme_color_warning", value: "#FFC107" },
    { key: "theme_color_is_dark", value: "FALSE" },
  ])
}
