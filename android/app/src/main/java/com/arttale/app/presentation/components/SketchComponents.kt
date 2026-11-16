package com.arttale.app.presentation.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.core.theme.sketchBorder

@Composable
fun SketchCard(
    modifier: Modifier = Modifier,
    backgroundColor: Color = PaperCard,
    cornerRadius: Dp = 12.dp,
    shadowOffset: Dp = 4.dp,
    borderColor: Color = InkBlack,
    onClick: (() -> Unit)? = null,
    content: @Composable () -> Unit
) {
    val clickableModifier = if (onClick != null) {
        Modifier.clickable(onClick = onClick)
    } else Modifier

    Box(
        modifier = modifier
            .sketchBorder(
                strokeWidth = 2.dp,
                borderColor = borderColor,
                shadowOffset = shadowOffset,
                cornerRadius = cornerRadius
            )
            .clip(RoundedCornerShape(cornerRadius))
            .background(backgroundColor)
            .then(clickableModifier)
    ) {
        content()
    }
}

@Composable
fun SketchButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    backgroundColor: Color = CreativeViolet,
    textColor: Color = PaperCard,
    leadingIcon: (@Composable () -> Unit)? = null,
    enabled: Boolean = true
) {
    val alphaModifier = if (enabled) Modifier else Modifier.background(Color.Gray)

    Box(
        modifier = modifier
            .defaultMinSize(minHeight = 48.dp)
            .sketchBorder(
                strokeWidth = 2.dp,
                borderColor = InkBlack,
                shadowOffset = if (enabled) 3.dp else 0.dp,
                cornerRadius = 10.dp
            )
            .clip(RoundedCornerShape(10.dp))
            .background(if (enabled) backgroundColor else Color.LightGray)
            .clickable(enabled = enabled, onClick = onClick)
            .padding(horizontal = 20.dp, vertical = 12.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            leadingIcon?.invoke()
            Text(
                text = text,
                color = textColor,
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center
            )
        }
    }
}
