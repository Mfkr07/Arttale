package com.arttale.app.presentation.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.arttale.app.core.common.toRupiah
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.CreativeVioletSoft
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.core.theme.WarmYellow
import com.arttale.app.core.theme.sketchBorder
import com.arttale.app.core.theme.sketchBorderLight

@Composable
fun TipJarCard(
    artistName: String,
    selectedTip: Long,
    onTipSelected: (Long) -> Unit,
    modifier: Modifier = Modifier
) {
    val tipOptions = listOf(0L, 5_000L, 10_000L, 20_000L)

    SketchCard(
        modifier = modifier.fillMaxWidth(),
        backgroundColor = CreativeVioletSoft,
        cornerRadius = 14.dp,
        shadowOffset = 4.dp
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "🫙", fontSize = 24.sp)
                    Text(
                        text = " Tip Jar Seniman",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 17.sp,
                        color = InkBlack
                    )
                }
                Box(
                    modifier = Modifier
                        .sketchBorderLight(cornerRadius = 6.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(WarmYellow)
                        .padding(horizontal = 8.dp, vertical = 2.dp)
                ) {
                    Text(
                        text = "100% ke Kreator",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = InkBlack
                    )
                }
            }

            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = "Dukung $artistName untuk terus berkarya. Pilih nominal tip untuk disertakan saat pesanan dibuat:",
                fontSize = 13.sp,
                color = InkMuted,
                lineHeight = 18.sp
            )

            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                tipOptions.forEach { amount ->
                    val isSelected = selectedTip == amount
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .sketchBorder(
                                strokeWidth = 1.5.dp,
                                borderColor = if (isSelected) CreativeViolet else InkBlack,
                                shadowOffset = if (isSelected) 2.dp else 0.dp,
                                cornerRadius = 8.dp
                            )
                            .clip(RoundedCornerShape(8.dp))
                            .background(if (isSelected) CreativeViolet else PaperCard)
                            .clickable { onTipSelected(amount) }
                            .padding(vertical = 10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = if (amount == 0L) "Nanti" else amount.toRupiah(),
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            color = if (isSelected) PaperCard else InkBlack
                        )
                    }
                }
            }
        }
    }
}
