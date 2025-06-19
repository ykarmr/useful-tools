import { IdGeneratorTranslations } from "../../../types/pages/tools/id-generator";

export const idGeneratorEs: IdGeneratorTranslations = {
  title: "Generador de ID/UUID",
  description:
    "Genera UUID, ULID y GUID fácilmente. Admite múltiples versiones con configuraciones personalizables de mayúsculas, minúsculas y guiones",
  keywords: [
    "generación de ID",
    "UUID",
    "ULID",
    "GUID",
    "identificador",
    "aleatorio",
    "único",
  ],

  generateSection: {
    title: "Configuración de Generación de ID",
    description: "Elige el tipo y configuración de los IDs que quieres generar",
  },

  types: {
    label: "Tipo de ID",
    uuid: {
      label: "UUID",
      description: "Identificador Único Universal",
    },
    ulid: {
      label: "ULID",
      description: "Identificador Único Universal Ordenable Lexicográficamente",
    },
    guid: {
      label: "GUID",
      description: "Identificador Único Global (formato Microsoft)",
    },
  },

  settings: {
    label: "Configuración de Generación",
    formatLabel: "Formato de Visualización",
    version: {
      label: "Versión UUID",
      v1: "Versión 1 (Timestamp + MAC)",
      v4: "Versión 4 (Aleatorio)",
      v6: "Versión 6 (Timestamp Mejorado)",
      v7: "Versión 7 (Basado en Tiempo Unix)",
    },
    count: {
      label: "Cantidad",
      placeholder: "1-100",
    },
    uppercase: {
      label: "Mayúsculas",
      description: "Mostrar IDs generados en mayúsculas",
    },
    hyphens: {
      label: "Con Guiones",
      description: "Incluir guiones (-) en la visualización",
    },
  },

  buttons: {
    generate: "Generar",
    copy: "Copiar",
    copyAll: "Copiar Todo",
    clear: "Limpiar",
    regenerate: "Regenerar",
  },

  messages: {
    invalidRange: "La cantidad debe estar entre 1 y 100",
    generateSuccess: "{count} IDs generados",
    copySuccess: "ID copiado al portapapeles",
    copyAllSuccess: "{count} IDs copiados al portapapeles",
    copyError: "Error al copiar",
  },

  result: {
    title: "Resultados Generados",
    generated: "IDs generados",
    empty: "Aún no se han generado IDs",
    emptyDescription:
      "Configura las opciones en el panel izquierdo y haz clic en el botón 'Generar' para crear IDs.",
    copySuccess: "ID copiado al portapapeles",
    copyAllSuccess: "Todos los IDs copiados al portapapeles",
  },

  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Elige el tipo de ID según tu caso de uso: UUID v4 para uso general, ULID para claves primarias de base de datos, GUID para entornos Microsoft",
      "Para UUID, selecciona la versión: v4 (aleatorio), v7 (ordenable por tiempo), v1 (timestamp+MAC), v6 (timestamp mejorado)",
      "Ingresa el número de IDs a generar (hasta 100 IDs de una vez)",
      "Configura el formato de visualización: alternar mayúsculas/minúsculas, incluir/excluir guiones",
      "Haz clic en el botón 'Generar' para crear IDs",
      "Copia los IDs generados individualmente o selecciona todos para copiar en lote",
      "Cada ID muestra la marca de tiempo de generación y se identifica con insignias de tipo y versión",
    ],
  },

  features: {
    title: "Características Principales",
    items: [
      "Admite generación de UUID v1/v4/v6/v7 (elige la versión óptima para tu caso de uso)",
      "Generación de ULID (ordenable cronológicamente, ideal para bases de datos)",
      "Generación de GUID (formato Microsoft con {llaves curvas})",
      "Genera hasta 100 IDs en lote",
      "Alternar entre mayúsculas y minúsculas (ajustar para legibilidad)",
      "Elegir si incluir guiones (personalizar para requisitos del sistema)",
      "Funcionalidad de copia con un clic (selección individual y en lote)",
      "Visualización de marca de tiempo de generación (seguimiento del historial de creación de ID)",
      "Garantía de unicidad estadística (probabilidad de colisión extremadamente baja)",
    ],
  },

  formats: {
    title: "Información sobre Formatos de ID",
    uuid: {
      title: "UUID (Identificador Único Universal)",
      description:
        "Identificador único universal de 128 bits. Múltiples versiones disponibles para diferentes casos de uso.",
      example: "Ejemplo: 550e8400-e29b-41d4-a716-446655440000",
      versions: {
        v1: "Basado en timestamp y dirección MAC (alta unicidad)",
        v4: "Generación completamente aleatoria (más común)",
        v6: "Versión mejorada de v1 (ordenable cronológicamente)",
        v7: "Basado en tiempo Unix (nuevo estándar, ordenable cronológicamente)",
      },
    },
    ulid: {
      title:
        "ULID (Identificador Único Universal Ordenable Lexicográficamente)",
      description:
        "Identificador único ordenable cronológicamente. Ideal para índices de base de datos.",
      example:
        "Ejemplo: 01ARZ3NDEKTSV4RRFFQ69G5FAV (estándar), 01ARZ3ND-EKTS-V4RR-FFQ6-9G5FAV (con guiones)",
      features: [
        "Timestamp de 48 bits (precisión de milisegundos)",
        "Componente aleatorio de 80 bits",
        "Codificación Base32 de 26 caracteres",
        "Ordenable lexicográficamente en orden cronológico",
        "Insensible a mayúsculas y minúsculas",
      ],
    },
    guid: {
      title: "GUID (Identificador Único Global)",
      description:
        "Implementación de UUID por Microsoft. Esencialmente la misma estructura que UUID v4.",
      example: "Ejemplo: {550E8400-E29B-41D4-A716-446655440000}",
    },
  },

  faqList: [
    {
      q: "¿Qué versión de UUID debo elegir?",
      a: "Para propósitos generales, se recomienda v4 (aleatorio). Para claves primarias de base de datos donde el orden cronológico importa, elige v7 o ULID.",
    },
    {
      q: "¿Cuál es la diferencia entre ULID y UUID?",
      a: "ULID es ordenable cronológicamente y tiene mejor rendimiento en índices de base de datos. UUID es completamente aleatorio y más comúnmente usado.",
    },
    {
      q: "¿Se garantiza la unicidad de los IDs generados?",
      a: "UUID y ULID tienen unicidad estadísticamente garantizada con probabilidad extremadamente baja de colisión. Sin embargo, no se garantiza unicidad al 100%.",
    },
    {
      q: "¿Son seguros?",
      a: "UUID v4 y ULID usan valores aleatorios haciéndolos difíciles de adivinar. Sin embargo, para aplicaciones de alta seguridad como tokens de autenticación, usa librerías de seguridad dedicadas.",
    },
    {
      q: "¿Dónde se almacenan los IDs generados?",
      a: "Los IDs generados se almacenan solo en la memoria del navegador y nunca se envían a servidores. Se borran cuando se recarga la página.",
    },
  ],
};

export default idGeneratorEs;
