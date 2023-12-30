import CMS from "decap-cms-app";
// import {IconControl, IconPreview, IconSchema} from 'decap-cms-widget-icon';
// import * as FontawesomeWidget from "netlify-cms-widget-fontawesome";
// import IconWidget from 'decap-cms-widget-icon';
// import {Control, Preview, schema} from 'decap-cms-rss-widget';
import { IconControl, IconPreview, IconSchema } from "decap-cms-widget-icon";

// import * as FontawesomeWidget from "netlify-cms-widget-fontawesome";
// // import IndexPagePreview from "./preview/IndexPagePreview"

// // CMS.registerPreviewTemplate('index', IndexPagePreview)

// import * as MaterialIconsWidget from "netlify-cms-widget-material-icons";
// CMS.registerWidget(
//   "material-icons",
//   MaterialIconsWidget.Control,
//   MaterialIconsWidget.Preview
// );
// CMS.registerPreviewStyle(
//   "https://fonts.googleapis.com/css?family=Material+Icons"
// );

CMS.registerWidget("icon", IconControl, IconPreview, IconSchema);
// CMS.init();
