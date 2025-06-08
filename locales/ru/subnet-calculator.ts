import type { SubnetCalculatorTranslations } from "../types/tools";

export const subnetCalculator: SubnetCalculatorTranslations = {
  title: "Калькулятор подсетей",
  description:
    "Вычисляйте сетевую информацию по IP-адресу и длине маски подсети.",
  keywords: ["подсеть", "IP-адрес", "сеть", "вычисление", "маска"],
  ipAddress: "IP-адрес",
  subnetMaskLength: "Длина маски подсети (CIDR)",
  subnetMask: "Маска подсети",
  networkAddress: "Сетевой адрес",
  broadcastAddress: "Широковещательный адрес",
  firstHost: "Первый адрес хоста",
  lastHost: "Последний адрес хоста",
  hosts: "Количество хостов",
  invalidInput: "Недопустимый ввод",
  displayBase: "Формат отображения",
  octal: "Восьмеричный",
  binary: "Двоичный",
  decimal: "Десятичный",
  hexadecimal: "Шестнадцатеричный",

  errorEmptyIp: "Пожалуйста, введите IP-адрес.",
  errorInvalidIp: "Неверный формат IP-адреса.",
  errorEmptyMask: "Пожалуйста, введите длину маски подсети.",
  errorInvalidMask: "Длина маски подсети должна быть в диапазоне от 0 до 32.",
  calculate: "Вычислить",
};
export default subnetCalculator;
