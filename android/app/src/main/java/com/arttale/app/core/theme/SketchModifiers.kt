package com.arttale.app.core.theme

import androidx.compose.foundation.border
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Creates the signature Neo-Brutalist "Sketchbook" hard drop shadow with black ink border.
 */
fun Modifier.sketchBorder(
    strokeWidth: Dp = 2.dp,
    borderColor: Color = InkBorder,
    shadowOffset: Dp = 4.dp,
    shadowColor: Color = InkBlack,
    cornerRadius: Dp = 12.dp
): Modifier = this
    .drawBehind {
        val shadowPx = shadowOffset.toPx()
        val cornerPx = cornerRadius.toPx()

        if (shadowPx > 0) {
            // Draw solid hard shadow behind
            drawRoundRect(
                color = shadowColor,
                topLeft = Offset(shadowPx, shadowPx),
                size = size,
                cornerRadius = CornerRadius(cornerPx, cornerPx),
                style = Fill
            )
        }
    }
    .border(
        width = strokeWidth,
        color = borderColor,
        shape = RoundedCornerShape(cornerRadius)
    )

/**
 * Light sketch border without heavy shadow, for smaller badges and tags.
 */
fun Modifier.sketchBorderLight(
    strokeWidth: Dp = 1.5.dp,
    borderColor: Color = InkBorder,
    cornerRadius: Dp = 8.dp
): Modifier = this.border(
    width = strokeWidth,
    color = borderColor,
    shape = RoundedCornerShape(cornerRadius)
)
