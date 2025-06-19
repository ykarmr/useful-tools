import { IdGeneratorTranslations } from "../../../types/pages/tools/id-generator";

export const idGeneratorZh: IdGeneratorTranslations = {
  title: "ID/UUID生成器",
  description:
    "轻松生成UUID、ULID和GUID。支持多个版本，可自定义大写、小写和连字符设置",
  keywords: ["ID生成", "UUID", "ULID", "GUID", "标识符", "随机", "唯一"],

  generateSection: {
    title: "ID生成设置",
    description: "选择要生成的ID类型和设置",
  },

  types: {
    label: "ID类型",
    uuid: {
      label: "UUID",
      description: "通用唯一识别码",
    },
    ulid: {
      label: "ULID",
      description: "通用唯一字典序可排序识别码",
    },
    guid: {
      label: "GUID",
      description: "全局唯一识别码（Microsoft格式）",
    },
  },

  settings: {
    label: "生成设置",
    formatLabel: "显示格式",
    version: {
      label: "UUID版本",
      v1: "版本 1（时间戳 + MAC）",
      v4: "版本 4（随机）",
      v6: "版本 6（改进时间戳）",
      v7: "版本 7（基于Unix时间）",
    },
    count: {
      label: "数量",
      placeholder: "1-100",
    },
    uppercase: {
      label: "大写",
      description: "以大写形式显示生成的ID",
    },
    hyphens: {
      label: "包含连字符",
      description: "在显示中包含连字符（-）",
    },
  },

  buttons: {
    generate: "生成",
    copy: "复制",
    copyAll: "全部复制",
    clear: "清除",
    regenerate: "重新生成",
  },

  messages: {
    invalidRange: "数量必须在1到100之间",
    generateSuccess: "已生成{count}个ID",
    copySuccess: "ID已复制到剪贴板",
    copyAllSuccess: "{count}个ID已复制到剪贴板",
    copyError: "复制失败",
  },

  result: {
    title: "生成结果",
    generated: "个ID已生成",
    empty: "尚未生成ID",
    emptyDescription: '在左侧面板中配置设置，然后点击"生成"按钮创建ID。',
    copySuccess: "ID已复制到剪贴板",
    copyAllSuccess: "所有ID已复制到剪贴板",
  },

  howToUse: {
    title: "使用方法",
    steps: [
      "根据您的用例选择ID类型：UUID v4用于一般用途，ULID用于数据库主键，GUID用于Microsoft环境",
      "对于UUID，选择版本：v4（随机）、v7（时间可排序）、v1（时间戳+MAC）、v6（改进时间戳）",
      "输入要生成的ID数量（一次最多100个ID）",
      "配置显示格式：切换大小写，包含/排除连字符",
      '点击"生成"按钮创建ID',
      "单独复制生成的ID或选择全部进行批量复制",
      "每个ID显示生成时间戳，并通过类型和版本徽章进行标识",
    ],
  },

  features: {
    title: "主要功能",
    items: [
      "支持UUID v1/v4/v6/v7生成（为您的用例选择最佳版本）",
      "ULID生成（按时间顺序可排序，非常适合数据库）",
      "GUID生成（带有{花括号}的Microsoft格式）",
      "批量生成最多100个ID",
      "在大写和小写之间切换（调整可读性）",
      "选择是否包含连字符（根据系统要求自定义）",
      "一键复制功能（单个和批量选择）",
      "生成时间戳显示（跟踪ID创建历史）",
      "统计唯一性保证（碰撞概率极低）",
    ],
  },

  formats: {
    title: "ID格式信息",
    uuid: {
      title: "UUID（通用唯一识别码）",
      description: "128位通用唯一识别符。提供多个版本适用于不同用例。",
      example: "示例：550e8400-e29b-41d4-a716-446655440000",
      versions: {
        v1: "基于时间戳和MAC地址（高唯一性）",
        v4: "完全随机生成（最常见）",
        v6: "v1的改进版本（按时间顺序可排序）",
        v7: "基于Unix时间（新标准，按时间顺序可排序）",
      },
    },
    ulid: {
      title: "ULID（通用唯一字典序可排序识别码）",
      description: "按时间顺序可排序的唯一识别符。非常适合数据库索引。",
      example:
        "示例：01ARZ3NDEKTSV4RRFFQ69G5FAV（标准），01ARZ3ND-EKTS-V4RR-FFQ6-9G5FAV（带连字符）",
      features: [
        "48位时间戳（毫秒精度）",
        "80位随机组件",
        "26字符Base32编码",
        "按时间顺序字典序可排序",
        "不区分大小写",
      ],
    },
    guid: {
      title: "GUID（全局唯一识别码）",
      description: "Microsoft的UUID实现。本质上与UUID v4具有相同结构。",
      example: "示例：{550E8400-E29B-41D4-A716-446655440000}",
    },
  },

  faqList: [
    {
      q: "我应该选择哪个UUID版本？",
      a: "对于一般用途，推荐v4（随机）。对于数据库主键等需要时间顺序的场合，选择v7或ULID。",
    },
    {
      q: "ULID和UUID有什么区别？",
      a: "ULID按时间顺序可排序，具有更好的数据库索引性能。UUID完全随机，使用更广泛。",
    },
    {
      q: "生成的ID是否保证唯一性？",
      a: "UUID和ULID具有统计上保证的唯一性，碰撞概率极低。但是，不能保证100%的唯一性。",
    },
    {
      q: "它们安全吗？",
      a: "UUID v4和ULID使用随机值，很难猜测。但是，对于认证令牌等高安全性应用，请使用专门的安全库。",
    },
    {
      q: "生成的ID存储在哪里？",
      a: "生成的ID仅存储在浏览器内存中，永远不会发送到服务器。页面重新加载时会被清除。",
    },
  ],
};

export default idGeneratorZh;
