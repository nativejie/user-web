import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg组件

// register globally
Vue.component("svg-icon", SvgIcon);

const svgFiles = import.meta.glob("./svg/*.svg", { eager: true });

// 遍历并使用这些文件
Object.keys(svgFiles).forEach((path) => {
  console.log("Loaded SVG:", path, svgFiles[path]);
});
