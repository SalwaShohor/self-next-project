//       /** G6VP 站点自动生成的配置 **/
//       export const GI_PROJECT_CONFIG = {
//   "nodes": [{
//     "id": "SimpleNode",
//     "props": {
//       "size": 26,
//       "color": "#ddd",
//       "label": []
//     },
//     "name": "Official node",
//     "order": -1,
//     "expressions": [],
//     "logic": true,
//     "groupName": "Default style"
//   }, {
//     "id": "SimpleNode",
//     "props": {
//       "size": 26,
//       "color": "#3056E3",
//       "label": ["account_balance^^id"]
//     },
//     "name": "Official node",
//     "expressions": [{
//       "name": "icon",
//       "operator": "eql",
//       "value": "account_balance"
//     }],
//     "order": 0,
//     "logic": true,
//     "groupName": "ACCOUNT_BALANCE TYPE"
//   }, {
//     "id": "SimpleNode",
//     "props": {
//       "size": 26,
//       "color": "#faad14",
//       "label": ["account_box^^id"]
//     },
//     "name": "Official node",
//     "expressions": [{
//       "name": "icon",
//       "operator": "eql",
//       "value": "account_box"
//     }],
//     "order": 1,
//     "logic": true,
//     "groupName": "ACCOUNT_BOX TYPE"
//   }, {
//     "id": "SimpleNode",
//     "props": {
//       "size": 26,
//       "color": "#a0d911",
//       "label": ["-^^id"]
//     },
//     "name": "Official node",
//     "expressions": [{
//       "name": "icon",
//       "operator": "eql",
//       "value": "-"
//     }],
//     "order": 2,
//     "logic": true,
//     "groupName": "- TYPE"
//   }],
//   "edges": [{
//     "id": "SimpleEdge",
//     "props": {
//       "size": 1,
//       "color": "#ddd",
//       "label": []
//     },
//     "name": "Official side",
//     "order": -1,
//     "expressions": [],
//     "logic": true,
//     "groupName": "Default style"
//   }, {
//     "id": "SimpleEdge",
//     "props": {
//       "size": 1,
//       "color": "#3056E3",
//       "label": []
//     },
//     "name": "Official side",
//     "expressions": [{
//       "name": "category",
//       "operator": "eql",
//       "value": "ib_txn"
//     }],
//     "order": 0,
//     "logic": true,
//     "groupName": "IB_TXN TYPE"
//   }, {
//     "id": "SimpleEdge",
//     "props": {
//       "size": 1,
//       "color": "#faad14",
//       "label": []
//     },
//     "name": "Official side",
//     "expressions": [{
//       "name": "category",
//       "operator": "eql",
//       "value": "ownership"
//     }],
//     "order": 1,
//     "logic": true,
//     "groupName": "OWNERSHIP TYPE"
//   }],
//   "layout": {
//     "id": "Force2",
//     "props": {
//       "type": "force2",
//       "animate": true,
//       "preset": {
//         "type": "concentric",
//         "width": 800,
//         "height": 800,
//         "minNodeSpacing": 10,
//         "nodeSize": 10
//       },
//       "clusterNodeStrength": 35,
//       "minMovement": 2,
//       "damping": 0.8,
//       "maxSpeed": 1000,
//       "distanceThresholdMode": "max",
//       "edgeStrength": 200,
//       "nodeStrength": 1000,
//       "defSpringLenCfg": {
//         "minLimitDegree": 5,
//         "maxLimitLength": 500,
//         "defaultSpring": 100
//       },
//       "centripetalOptions": {
//         "leaf": 2,
//         "single": 2,
//         "others": 1
//       },
//       "advanceWeight": false,
//       "edgeWeightFieldScale": 1,
//       "nodeWeightFromType": "node",
//       "nodeWeightFieldScale": 1,
//       "directed": false,
//       "directedFromType": "node",
//       "directedInWeightField": "is_different_bank",
//       "directedOutWeightField": "is_different_bank",
//       "directedIsLog": true,
//       "directedMultiple": "0.1"
//     }
//   },
//   "components": [{
//     "id": "ZoomIn",
//     "type": "GIAC",
//     "name": "放大",
//     "props": {
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "Zoom in",
//         "isShowIcon": true,
//         "icon": "icon-zoomin",
//         "isShowTooltip": true,
//         "tooltip": "",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "ZoomOut",
//     "type": "GIAC",
//     "name": "缩小",
//     "props": {
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "Zoom out",
//         "isShowIcon": true,
//         "icon": "icon-zoomout",
//         "isShowTooltip": true,
//         "tooltip": "",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "FitCenterView",
//     "type": "GIAC",
//     "name": "自适应居中",
//     "props": {
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "View adaptive centering",
//         "isShowIcon": true,
//         "icon": "icon-fit-center",
//         "isShowTooltip": true,
//         "tooltip": "",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "LassoSelect",
//     "type": "GIAC",
//     "name": "自由圈选",
//     "props": {
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "Free selection",
//         "isShowIcon": true,
//         "icon": "icon-lasso",
//         "isShowTooltip": true,
//         "tooltip": "Hold down Shift and click the canvas to freely select",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "PropertiesPanel",
//     "type": "AUTO",
//     "name": "属性面板",
//     "props": {
//       "serviceId": "GI/PropertiesPanel",
//       "title": "Properties panel",
//       "placement": "RT",
//       "width": "356px",
//       "height": "calc(100% - 0px)",
//       "offset": [10, 10],
//       "animate": false,
//       "enableInfoDetect": true,
//       "defaultiStatistic": false
//     }
//   }, {
//     "id": "ActivateRelations",
//     "type": "AUTO",
//     "name": "元素高亮",
//     "props": {
//       "enableNodeHover": true,
//       "enableEdgeHover": true,
//       "enable": true,
//       "trigger": "click",
//       "upstreamDegree": 1,
//       "downstreamDegree": 1,
//       "multiSelectEnabled": false,
//       "modifierKey": "alt"
//     }
//   }, {
//     "id": "CanvasSetting",
//     "type": "AUTO",
//     "name": "画布设置",
//     "props": {
//       "styleCanvas": {
//         "backgroundColor": "#fff",
//         "backgroundImage": "https://gw.alipayobjects.com/mdn/rms_0d75e8/afts/img/A*k9t4QamMuQ4AAAAAAAAAAAAAARQnAQ"
//       },
//       "dragCanvas": {
//         "disabled": false,
//         "direction": "both",
//         "enableOptimize": true
//       },
//       "zoomCanvas": {
//         "disabled": false,
//         "enableOptimize": true
//       },
//       "clearStatus": true,
//       "doubleClick": true
//     }
//   }, {
//     "id": "NodeLegend",
//     "type": "AUTO",
//     "name": "节点图例",
//     "props": {
//       "sortKey": "type",
//       "textColor": "#ddd",
//       "placement": "LB",
//       "offset": [100, 20]
//     }
//   }, {
//     "id": "Placeholder",
//     "type": "AUTO",
//     "name": "Canvas placeholder",
//     "props": {
//       "img": "https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1BGfQ78mW4kAAAAAAAAAAAAADmJ7AQ/original",
//       "text": "The current canvas is empty. Please try Data/graph data source/import/sample data first 」",
//       "width": 340,
//       "textColor": "#999",
//       "spacing": 8
//     }
//   }, {
//     "id": "FilterPanel",
//     "type": "GIAC_CONTENT",
//     "name": "Filter Panel",
//     "props": {
//       "histogramColor": "#3056E3",
//       "isFilterIsolatedNodes": true,
//       "highlightMode": true,
//       "filterKeys": [],
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC_CONTENT": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": true,
//         "title": "Filter Panel",
//         "isShowIcon": true,
//         "icon": "icon-filter",
//         "isShowTooltip": true,
//         "tooltip": "Filter canvas information through attributes to customize",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "top",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true,
//         "containerType": "div",
//         "containerAnimate": false,
//         "containerPlacement": "RT",
//         "offset": [0, 0],
//         "containerWidth": "400px",
//         "containerHeight": "calc(100% - 100px)",
//         "contaienrMask": false
//       },
//       "enableInfoDetect": true,
//       "filterLogic": "and",
//       "histogramOptions": {
//         "isCustom": false,
//         "min": null,
//         "max": null,
//         "binWidth": null
//       }
//     }
//   }, {
//     "id": "LargeGraph",
//     "type": "GIAC",
//     "name": "3D large graph",
//     "props": {
//       "visible": false,
//       "minSize": "50%",
//       "maxSize": "100%",
//       "placement": "RB",
//       "offset": [0, 0],
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "3D large graph",
//         "isShowIcon": true,
//         "icon": "icon-3d",
//         "isShowTooltip": true,
//         "tooltip": "",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       },
//       "backgroundColor": "#fff",
//       "highlightColor": "red"
//     }
//   }, {
//     "id": "MapMode",
//     "type": "GIAC",
//     "name": "Map mode",
//     "props": {
//       "visible": false,
//       "type": "amap",
//       "theme": "light",
//       "minSize": "50%",
//       "maxSize": "100%",
//       "placement": "RB",
//       "offset": [0, 0],
//       "longitudeKey": "longitude",
//       "latitudeKey": "latitude",
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "Map mode",
//         "isShowIcon": true,
//         "icon": "icon-global",
//         "isShowTooltip": true,
//         "tooltip": "",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "ContextMenu",
//     "type": "GICC_MENU",
//     "name": "ContextMenu",
//     "props": {
//       "GI_CONTAINER": ["NeighborsQuery", "ToggleClusterWithMenu", "PinNodeWithMenu"],
//       "nodeMenuComponents": ["NeighborsQuery", "ToggleClusterWithMenu", "PinNodeWithMenu"]
//     }
//   }, {
//     "id": "ToggleClusterWithMenu",
//     "type": "GIAC_MENU",
//     "name": "Expand/fold up",
//     "props": {
//       "isReLayout": false,
//       "degree": 1
//     }
//   }, {
//     "id": "NeighborsQuery",
//     "type": "GIAC_MENU",
//     "name": "Neighbor query",
//     "props": {
//       "serviceId": "GI/NeighborsQuery",
//       "degree": "1",
//       "isFocus": true,
//       "menuServiceId": "GI/NeighborsQueryMenu",
//       "limit": 100
//     }
//   }, {
//     "id": "Copyright",
//     "type": "AUTO",
//     "name": "Copyright",
//     "props": {
//       "imageUrl": "https://gw.alipayobjects.com/zos/bmw-prod/c2d4b2f5-2a34-4ae5-86c4-df97f7136105.svg",
//       "width": 200,
//       "height": 30,
//       "placement": "RB",
//       "offset": [10, 10]
//     }
//   }, {
//     "id": "Loading",
//     "type": "AUTO",
//     "name": "Load animation",
//     "props": {}
//   }, {
//     "id": "PinNodeWithMenu",
//     "type": "GIAC_MENU",
//     "name": "Fixed node (MENU)",
//     "props": {
//       "color": "#fff",
//       "fill": "#262626"
//     }
//   }, {
//     "id": "ForceSimulation",
//     "type": "GIAC",
//     "name": "Force layout controller",
//     "props": {
//       "autoPin": true,
//       "dragNodeMass": 10000000,
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "Force layout controller",
//         "isShowIcon": true,
//         "icon": "icon-layout-force",
//         "isShowTooltip": true,
//         "tooltip": "",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "Initializer",
//     "type": "INITIALIZER",
//     "name": "Initializer",
//     "props": {
//       "serviceId": "GI/GI_SERVICE_INTIAL_GRAPH",
//       "schemaServiceId": "GI/GI_SERVICE_SCHEMA",
//       "GI_INITIALIZER": true,
//       "aggregate": false,
//       "transByFieldMapping": false
//     }
//   }, {
//     "id": "PropertyGraphInitializer",
//     "type": "AUTO",
//     "name": "Attribute graph calculation",
//     "props": {}
//   }, {
//     "id": "LayoutSwitch",
//     "type": "GIAC",
//     "name": "Layout switching",
//     "props": {
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "Layout switching",
//         "isShowIcon": true,
//         "icon": "icon-layout",
//         "isShowTooltip": false,
//         "tooltip": "Switch canvas layout with one click",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "Toolbar",
//     "type": "GICC",
//     "name": "Toolbar",
//     "props": {
//       "GI_CONTAINER": ["ZoomIn", "ZoomOut", "FitCenterView", "LargeGraph", "MapMode", "ForceSimulation",
//         "LayoutSwitch", "Export"
//       ],
//       "direction": "vertical",
//       "placement": "LT",
//       "offset": [24, 64]
//     }
//   }, {
//     "id": "Export",
//     "type": "GIAC",
//     "name": "Export",
//     "props": {
//       "GI_CONTAINER_INDEX": 2,
//       "GIAC": {
//         "visible": false,
//         "disabled": false,
//         "isShowTitle": false,
//         "title": "Export",
//         "isShowIcon": true,
//         "icon": "icon-export",
//         "isShowTooltip": true,
//         "tooltip": "Export CSV,PNG,JSON data",
//         "tooltipColor": "#3056e3",
//         "tooltipPlacement": "right",
//         "hasDivider": false,
//         "height": "46px",
//         "isVertical": true
//       }
//     }
//   }, {
//     "id": "SegmentedLayout",
//     "type": "GICC_LAYOUT",
//     "name": "Segment layout",
//     "props": {
//       "containers": [{
//         "id": "GI_CONTAINER_SIDE",
//         "name": "Side Container",
//         "required": true,
//         "GI_CONTAINER": ["FilterPanel"],
//         "display": true
//       }]
//     }
//   }],
//   "pageLayout": {
//     "id": "SegmentedLayout",
//     "type": "GICC_LAYOUT",
//     "name": "Segment layout",
//     "props": {
//       "containers": [{
//         "id": "GI_CONTAINER_SIDE",
//         "name": "Side Container",
//         "required": true,
//         "GI_CONTAINER": ["FilterPanel"],
//         "display": true
//       }]
//     }
//   }
// };

//       /** G6VP 站点选择服务引擎的上下文配置信息 **/
//       export const SERVER_ENGINE_CONTEXT = {
//   "GI_SITE_PROJECT_ID": "27ee58b2-7fbe-4fa2-8276-7b19cc7dfb70",
//   "engineId": "GI"
// };

//       window['LOCAL_DATA_FOR_GI_ENGINE'] = {
//         data: {
//   "nodes": [{
//     "id": "account_7",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-03T00:00:00",
//       "icon": "account_balance",
//       "id": "account_7",
//       "is_different_bank": 0,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_20",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-05T00:00:00",
//       "icon": "account_balance",
//       "id": "account_20",
//       "is_different_bank": 0,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_55",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-07T00:00:00",
//       "icon": "account_balance",
//       "id": "account_55",
//       "is_different_bank": 0,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_81",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-15T00:00:00",
//       "icon": "account_balance",
//       "id": "account_81",
//       "is_different_bank": 0,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_103",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-15T00:00:00",
//       "icon": "account_balance",
//       "id": "account_103",
//       "is_different_bank": 0,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_901",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-03T00:00:00",
//       "icon": "account_balance",
//       "id": "account_901",
//       "is_different_bank": 0,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_902",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-10T00:00:00",
//       "icon": "account_balance",
//       "id": "account_902",
//       "is_different_bank": 0,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_903",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-09T00:00:00",
//       "icon": "account_balance",
//       "id": "account_903",
//       "is_different_bank": 1,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "account_904",
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "create_date": "2019-01-08T00:00:00",
//       "icon": "account_balance",
//       "id": "account_904",
//       "is_different_bank": 1,
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "id": "customer_7",
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "account_box",
//       "id": "customer_7",
//       "data": {},
//       "defaultStyle": {},
//       "address": "-",
//       "customer_type": "retail",
//       "first_name": "-",
//       "last_name": "-",
//       "phone": "-",
//       "remarks": "high-value IB txn into customer 103's account",
//       "risk_category": "medium",
//       "risk_score": 50
//     }
//   }, {
//     "id": "customer_20",
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "account_box",
//       "id": "customer_20",
//       "data": {},
//       "defaultStyle": {},
//       "address": "-",
//       "customer_type": "retail",
//       "first_name": "-",
//       "last_name": "-",
//       "phone": "-",
//       "remarks": "high-value IB txn into customer 103's account",
//       "risk_category": "medium",
//       "risk_score": 50
//     }
//   }, {
//     "id": "customer_55",
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "account_box",
//       "id": "customer_55",
//       "data": {},
//       "defaultStyle": {},
//       "address": "-",
//       "customer_type": "retail",
//       "first_name": "-",
//       "last_name": "-",
//       "phone": "-",
//       "remarks": "high-value IB txn into customer 103's account",
//       "risk_category": "medium",
//       "risk_score": 50
//     }
//   }, {
//     "id": "customer_81",
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "account_box",
//       "id": "customer_81",
//       "data": {},
//       "defaultStyle": {},
//       "address": "-",
//       "customer_type": "retail",
//       "first_name": "-",
//       "last_name": "-",
//       "phone": "-",
//       "remarks": "high-value IB txn into customer 103's account",
//       "risk_category": "medium",
//       "risk_score": 50
//     }
//   }, {
//     "id": "customer_103",
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "account_box",
//       "id": "customer_103",
//       "data": {},
//       "defaultStyle": {},
//       "address": "103 RD",
//       "customer_type": "retail",
//       "first_name": "john",
//       "last_name": "doe",
//       "phone": "+65 0000 0103",
//       "remarks": "high-value purchases from luxury retailer. source of funds from 4 related accounts",
//       "risk_category": "high",
//       "risk_score": 99
//     }
//   }, {
//     "id": "customer_901",
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "account_box",
//       "id": "customer_901",
//       "data": {},
//       "defaultStyle": {},
//       "address": "901 RD",
//       "customer_type": "retail",
//       "first_name": "jane",
//       "last_name": "doe",
//       "phone": "+65 0000 0103",
//       "remarks": "source of funds for customer 103's purchase of luxury items. customer has same phone number as customer 103.",
//       "risk_category": "medium",
//       "risk_score": 74
//     }
//   }, {
//     "id": "customer_902",
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "account_box",
//       "id": "customer_902",
//       "data": {},
//       "defaultStyle": {},
//       "address": "103 RD",
//       "customer_type": "retail",
//       "first_name": "jim",
//       "last_name": "smith",
//       "phone": "+65 0000 0902",
//       "remarks": "source of funds for customer 103's purchase of luxury items. customer has same address as customer 103.",
//       "risk_category": "medium",
//       "risk_score": 74
//     }
//   }, {
//     "id": "other_banks",
//     "nodeType": "-",
//     "nodeTypeKeyFromProperties": "icon",
//     "data": {
//       "icon": "-",
//       "id": "other_banks",
//       "data": {},
//       "defaultStyle": {},
//       "address": "-",
//       "customer_type": "-",
//       "first_name": "-",
//       "last_name": "-",
//       "phone": "-",
//       "remarks": "other banks",
//       "risk_category": "-",
//       "risk_score": "-"
//     }
//   }],
//   "edges": [{
//     "source": "account_103",
//     "target": "account_904",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 1000000,
//       "balance": 200000,
//       "category": "ib_txn",
//       "date": "2020-01-01T00:00:00",
//       "id": "ib_txn_1",
//       "is_foreign_source": 0,
//       "is_foreign_target": 1,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_103",
//       "source_owner": "customer_103",
//       "target": "account_904",
//       "target_owner": "other_banks",
//       "time": "00:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_903",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 100000,
//       "balance": null,
//       "category": "ib_txn",
//       "date": "2020-01-02T01:00:00",
//       "id": "ib_txn_2",
//       "is_foreign_source": 1,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_903",
//       "source_owner": "other_banks",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "01:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_103",
//     "target": "account_904",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 50000,
//       "balance": 250000,
//       "category": "ib_txn",
//       "date": "2020-01-02T02:00:00",
//       "id": "ib_txn_3",
//       "is_foreign_source": 0,
//       "is_foreign_target": 1,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_103",
//       "source_owner": "customer_103",
//       "target": "account_904",
//       "target_owner": "other_banks",
//       "time": "02:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_904",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 2000000,
//       "balance": null,
//       "category": "ib_txn",
//       "date": "2020-01-01T03:00:00",
//       "id": "ib_txn_4",
//       "is_foreign_source": 1,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_904",
//       "source_owner": "other_banks",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "03:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_103",
//     "target": "account_903",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 1000000,
//       "balance": 1250000,
//       "category": "ib_txn",
//       "date": "2020-01-02T04:00:00",
//       "id": "ib_txn_5",
//       "is_foreign_source": 0,
//       "is_foreign_target": 1,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_103",
//       "source_owner": "customer_103",
//       "target": "account_903",
//       "target_owner": "other_banks",
//       "time": "04:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_103",
//     "target": "account_903",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 1000000,
//       "balance": 250000,
//       "category": "ib_txn",
//       "date": "2020-01-02T05:00:00",
//       "id": "ib_txn_6",
//       "is_foreign_source": 0,
//       "is_foreign_target": 1,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_103",
//       "source_owner": "customer_103",
//       "target": "account_903",
//       "target_owner": "other_banks",
//       "time": "05:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_901",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 250000,
//       "balance": 10000,
//       "category": "ib_txn",
//       "date": "2020-01-01T06:00:00",
//       "id": "ib_txn_7",
//       "is_foreign_source": 0,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_901",
//       "source_owner": "customer_901",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "06:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_902",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 250000,
//       "balance": 300000,
//       "category": "ib_txn",
//       "date": "2020-01-01T06:30:00",
//       "id": "ib_txn_8",
//       "is_foreign_source": 0,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_902",
//       "source_owner": "customer_902",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "06:30:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_903",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 250000,
//       "balance": null,
//       "category": "ib_txn",
//       "date": "2020-01-02T06:00:00",
//       "id": "ib_txn_9",
//       "is_foreign_source": 1,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_903",
//       "source_owner": "other_banks",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "06:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_904",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 250000,
//       "balance": null,
//       "category": "ib_txn",
//       "date": "2020-01-01T00:00:00",
//       "id": "ib_txn_10",
//       "is_foreign_source": 1,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_904",
//       "source_owner": "other_banks",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "00:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_7",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 125000,
//       "balance": 225000,
//       "category": "ib_txn",
//       "date": "2020-01-03T22:00:00",
//       "id": "ib_txn_72",
//       "is_foreign_source": 0,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_7",
//       "source_owner": "customer_7",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "22:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_55",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 250000,
//       "balance": 475000,
//       "category": "ib_txn",
//       "date": "2020-01-03T22:00:00",
//       "id": "ib_txn_73",
//       "is_foreign_source": 0,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_55",
//       "source_owner": "customer_55",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "22:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_20",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 150000,
//       "balance": 625000,
//       "category": "ib_txn",
//       "date": "2020-01-04T18:00:00",
//       "id": "ib_txn_74",
//       "is_foreign_source": 0,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_20",
//       "source_owner": "customer_20",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "18:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "account_81",
//     "target": "account_103",
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "amount": 300000,
//       "balance": 925000,
//       "category": "ib_txn",
//       "date": "2020-01-04T18:00:00",
//       "id": "ib_txn_75",
//       "is_foreign_source": 0,
//       "is_foreign_target": 0,
//       "is_high_risk_source_target_location": 0,
//       "relation": "ib_transfer",
//       "source": "account_81",
//       "source_owner": "customer_81",
//       "target": "account_103",
//       "target_owner": "customer_103",
//       "time": "18:00:00",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "customer_7",
//     "target": "account_7",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_210",
//       "relation": "owns",
//       "source": "customer_7",
//       "target": "account_7",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "customer_20",
//     "target": "account_20",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_223",
//       "relation": "owns",
//       "source": "customer_20",
//       "target": "account_20",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "customer_55",
//     "target": "account_55",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_258",
//       "relation": "owns",
//       "source": "customer_55",
//       "target": "account_55",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "customer_81",
//     "target": "account_81",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_284",
//       "relation": "owns",
//       "source": "customer_81",
//       "target": "account_81",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "customer_103",
//     "target": "account_103",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_306",
//       "relation": "owns",
//       "source": "customer_103",
//       "target": "account_103",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "customer_901",
//     "target": "account_901",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_307",
//       "relation": "owns",
//       "source": "customer_901",
//       "target": "account_901",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "customer_902",
//     "target": "account_902",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_308",
//       "relation": "owns",
//       "source": "customer_902",
//       "target": "account_902",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "other_banks",
//     "target": "account_903",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_310",
//       "relation": "owns",
//       "source": "other_banks",
//       "target": "account_903",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "other_banks",
//     "target": "account_904",
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "category": "ownership",
//       "id": "ownership_311",
//       "relation": "owns",
//       "source": "other_banks",
//       "target": "account_904",
//       "data": {},
//       "defaultStyle": {}
//     }
//   }, {
//     "source": "other_banks",
//     "target": "account_103",
//     "edgeTypeKeyFromProperties": "category",
//     "data": {
//       "source": "other_banks",
//       "target": "account_103"
//     }
//   }],
//   "combos": []
// },
//         schemaData: {
//   "nodes": [{
//     "nodeType": "account_balance",
//     "nodeTypeKeyFromProperties": "icon",
//     "properties": {
//       "create_date": "string",
//       "icon": "string",
//       "id": "string",
//       "is_different_bank": "number"
//     }
//   }, {
//     "nodeType": "account_box",
//     "nodeTypeKeyFromProperties": "icon",
//     "properties": {
//       "icon": "string",
//       "id": "string",
//       "address": "string",
//       "customer_type": "string",
//       "first_name": "string",
//       "last_name": "string",
//       "phone": "string",
//       "remarks": "string",
//       "risk_category": "string",
//       "risk_score": "number"
//     }
//   }, {
//     "nodeType": "-",
//     "nodeTypeKeyFromProperties": "icon",
//     "properties": {
//       "icon": "string",
//       "id": "string",
//       "address": "string",
//       "customer_type": "string",
//       "first_name": "string",
//       "last_name": "string",
//       "phone": "string",
//       "remarks": "string",
//       "risk_category": "string",
//       "risk_score": "string"
//     }
//   }],
//   "edges": [{
//     "edgeType": "ib_txn",
//     "edgeTypeKeyFromProperties": "category",
//     "sourceNodeType": "account_balance",
//     "targetNodeType": "account_balance",
//     "properties": {
//       "amount": "number",
//       "balance": "number",
//       "category": "string",
//       "date": "string",
//       "id": "string",
//       "is_foreign_source": "number",
//       "is_foreign_target": "number",
//       "is_high_risk_source_target_location": "number",
//       "relation": "string",
//       "source": "string",
//       "source_owner": "string",
//       "target": "string",
//       "target_owner": "string",
//       "time": "string"
//     }
//   }, {
//     "edgeType": "ownership",
//     "edgeTypeKeyFromProperties": "category",
//     "sourceNodeType": "account_box",
//     "targetNodeType": "account_balance",
//     "properties": {
//       "category": "string",
//       "id": "string",
//       "relation": "string",
//       "source": "string",
//       "target": "string"
//     }
//   }, {
//     "edgeType": "UNKNOW",
//     "edgeTypeKeyFromProperties": "category",
//     "sourceNodeType": "-",
//     "targetNodeType": "account_balance",
//     "properties": {
//       "source": "string",
//       "target": "string"
//     }
//   }]
// },
//       };

//       /** 导出的主题 **/
//       export const THEME_VALUE = "undefined";
