---
lang: es
title: Turtle Traders Simulator
viewport: width=device-width, initial-scale=1.0
---

# Turtle Traders Simulator

**Turtle Traders Simulator** es una herramienta diseñada para ayudar a
la comunidad a aplicar los conocimientos de Richard Dennis y William
Eckhardt en el trading de criptomonedas. Inspirado en las enseñanzas de
los Turtle Traders, este proyecto busca proporcionar una plataforma
accesible y educativa para entender y aplicar las estrategias de trading
de tendencias.

## Propósito del Proyecto

El propósito de esta herramienta es ofrecer a los traders y entusiastas
de las criptomonedas una manera de simular estrategias de trading
basadas en las enseñanzas de los Turtle Traders. La simulación incluye
parámetros clave como el capital inicial, el riesgo por operación, la
volatilidad, y los niveles de breakout y trailing stop.

## Proyecto Libre

Este proyecto es de código abierto y está disponible para que la
comunidad lo utilice, modifique y mejore. Puedes contribuir al
desarrollo del proyecto a través de
[GitHub](https://github.com/tu-repo/turtle-traders-simulator).

## Funcionalidades

### 1. Selección de Criptomonedas

El usuario puede seleccionar entre varias criptomonedas (BTC, ETH, DOGE)
y ver el precio actual en el combo de selección.

### 2. Parámetros de Simulación

El usuario puede ingresar los siguientes parámetros:

-   **Capital Inicial:** El capital disponible para el trading.
-   **Riesgo por Operación (%):** El porcentaje del capital que se
    arriesga en cada operación.
-   **Volatilidad:** Un parámetro para ajustar la volatilidad del
    mercado.
-   **Breakout High (%):** El porcentaje por encima del precio actual
    para determinar un nivel de breakout al alza.
-   **Breakout Low (%):** El porcentaje por debajo del precio actual
    para determinar un nivel de breakout a la baja.
-   **Trailing Stop (%):** El porcentaje por debajo del precio actual
    para determinar el trailing stop.

### 3. Simulación

Al hacer clic en el botón "Simular", la herramienta calcula y muestra
los siguientes resultados:

-   Capital Inicial
-   Riesgo por Operación
-   Volatilidad
-   Precio Actual de la criptomoneda seleccionada
-   Tamaño de la Posición
-   Breakout High
-   Breakout Low
-   Trailing Stop
-   Potencial Ganancia en Posición Larga
-   Potencial Ganancia en Posición Corta

### 4. Resultados

Los resultados de la simulación se muestran en una página separada,
organizada en una lista con un estilo de lista insertada fuerte.

## Algoritmo de los Turtle Traders

El método de los Turtle Traders, desarrollado por Richard Dennis y
William Eckhardt, es una estrategia de trading basada en seguir las
tendencias del mercado. A continuación se explica cómo funciona el
algoritmo:

### Principios Básicos

1.  **Breakout:** La estrategia de los Turtle Traders se basa en
    identificar breakouts, es decir, movimientos significativos del
    precio que rompen niveles de resistencia o soporte establecidos. Los
    traders compran cuando el precio rompe un nivel alto reciente
    (breakout al alza) y venden cuando rompe un nivel bajo reciente
    (breakout a la baja).
2.  **Tamaño de la Posición:** El tamaño de la posición se calcula en
    función del capital disponible, el riesgo por operación y la
    volatilidad del mercado. Los Turtle Traders usan un enfoque
    fraccional para determinar cuánto del capital total arriesgar en
    cada operación.
3.  **Trailing Stop:** Para proteger las ganancias y limitar las
    pérdidas, se utiliza un trailing stop, que es un nivel de stop loss
    dinámico que se ajusta a medida que el precio se mueve a favor de la
    posición.

### Fórmulas y Cálculos

#### Cálculo del Tamaño de la Posición

El tamaño de la posición se determina utilizando la fórmula:

    Tamaño de la Posición = (Capital * (Riesgo / 100)) / Volatilidad

Donde:

-   **Capital:** El capital inicial disponible para trading.
-   **Riesgo:** El porcentaje del capital que se está dispuesto a
    arriesgar en cada operación.
-   **Volatilidad:** Una medida de la volatilidad del mercado,
    generalmente calculada como el rango verdadero promedio (ATR) del
    instrumento financiero.

#### Cálculo de los Niveles de Breakout

-   **Breakout High:** `Precio Actual * (1 + (Breakout High % / 100))`
-   **Breakout Low:** `Precio Actual * (1 - (Breakout Low % / 100))`

#### Cálculo del Trailing Stop

-   **Trailing Stop:** `Precio Actual * (1 - (Trailing Stop % / 100))`

### Ejemplo de Código

#### Obtener Precios

    async function getPrice(symbol) {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
      const data = await response.json();
      return parseFloat(data.price);
    }

#### Calcular Tamaño de la Posición

    function calculatePositionSize(capital, riskPercent, volatility) {
      const riskAmount = capital * (riskPercent / 100);
      return riskAmount / volatility;
    }

#### Calcular Breakout y Trailing Stop

    const breakoutHighValue = price * (1 + breakoutHigh / 100);
    const breakoutLowValue = price * (1 - breakoutLow / 100);
    const trailingStopValue = price * (1 - trailingStop / 100);

## Cómo Contribuir

1.  Haz un fork del proyecto
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3.  Realiza tus cambios y haz commit
    (`git commit -am 'Agregar nueva funcionalidad'`)
4.  Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5.  Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo
LICENSE.md para más detalles.

## Contacto

Para preguntas o sugerencias, puedes contactarme en
<tu-email@ejemplo.com>.
