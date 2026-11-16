package com.arttale.app.presentation.creator

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CloudUpload
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.arttale.app.core.common.toRupiah
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.CreativeVioletSoft
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.PaperBackground
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.core.theme.WarmYellow
import com.arttale.app.core.theme.sketchBorder
import com.arttale.app.core.theme.sketchBorderLight
import com.arttale.app.presentation.cart.CartViewModel
import com.arttale.app.presentation.components.BottomNavBar
import com.arttale.app.presentation.components.SketchButton
import com.arttale.app.presentation.components.SketchCard
import com.arttale.app.presentation.navigation.Screen

data class StudioMockup(val id: String, val name: String, val emoji: String, val baseCost: Long, val royalty: Long, var enabled: Boolean)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun UploadStudioScreen(
    onNavigateBottom: (Screen) -> Unit,
    cartViewModel: CartViewModel = hiltViewModel()
) {
    val cartState by cartViewModel.uiState.collectAsState()
    val context = LocalContext.current

    var designTitle by remember { mutableStateOf("Nusantara Cyber Mecha") }
    var selectedArtworkEmoji by remember { mutableStateOf("🤖") }

    val mockups = remember {
        mutableStateListOf(
            StudioMockup("tee", "T-Shirt Cotton Combed", "👕", 95_000, 35_000, true),
            StudioMockup("hoodie", "Streetwear Hoodie", "🧥", 245_000, 70_000, true),
            StudioMockup("sticker", "Die-Cut Sticker Pack", "✨", 25_000, 10_000, true),
            StudioMockup("tote", "Canvas Tote Bag", "👜", 75_000, 25_000, true),
            StudioMockup("mug", "Ceramic Artisan Mug", "☕", 65_000, 20_000, false)
        )
    }

    val totalPotentialRoyalty = mockups.filter { it.enabled }.sumOf { it.royalty }

    Scaffold(
        containerColor = PaperBackground,
        topBar = {
            TopAppBar(
                title = { Text("Universal Upload Studio", fontWeight = FontWeight.Bold, fontSize = 19.sp) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = PaperBackground)
            )
        },
        bottomBar = {
            Column {
                Surface(
                    modifier = Modifier.fillMaxWidth(),
                    color = PaperCard,
                    shadowElevation = 8.dp
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(text = "Estimasi Royalti / Sale", fontSize = 11.sp, color = InkMuted)
                            Text(
                                text = totalPotentialRoyalty.toRupiah(),
                                fontWeight = FontWeight.Black,
                                fontSize = 18.sp,
                                color = CreativeViolet
                            )
                        }

                        SketchButton(
                            text = "Publish Karyamu 🚀",
                            onClick = {
                                Toast.makeText(context, "Karya '$designTitle' berhasil dipublish ke katalog!", Toast.LENGTH_LONG).show()
                            },
                            backgroundColor = InkBlack
                        )
                    }
                }

                BottomNavBar(
                    currentRoute = Screen.UploadStudio.route,
                    cartCount = cartState.totalQuantity,
                    onNavigate = onNavigateBottom
                )
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            // Upload Banner
            item {
                SketchCard(
                    modifier = Modifier.fillMaxWidth(),
                    backgroundColor = CreativeVioletSoft,
                    cornerRadius = 14.dp,
                    shadowOffset = 4.dp
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Box(
                            modifier = Modifier
                                .size(56.dp)
                                .sketchBorder(cornerRadius = 28.dp)
                                .clip(RoundedCornerShape(28.dp))
                                .background(PaperCard),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(text = selectedArtworkEmoji, fontSize = 32.sp)
                        }

                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Master File Terunggah (PNG 300 DPI)",
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp,
                            color = InkBlack
                        )
                        Text(
                            text = "Sistem otomatis menempelkan desain ke puluhan produk di bawah:",
                            fontSize = 12.sp,
                            color = InkMuted,
                            textAlign = androidx.compose.ui.text.style.TextAlign.Center
                        )

                        Spacer(modifier = Modifier.height(10.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            listOf("🤖", "🦊", "⚡", "🌸", "🍜").forEach { emoji ->
                                Box(
                                    modifier = Modifier
                                        .size(36.dp)
                                        .sketchBorderLight(cornerRadius = 8.dp)
                                        .clip(RoundedCornerShape(8.dp))
                                        .background(if (selectedArtworkEmoji == emoji) WarmYellow else PaperCard)
                                        .clickable { selectedArtworkEmoji = emoji },
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(text = emoji, fontSize = 20.sp)
                                }
                            }
                        }
                    }
                }
            }

            item {
                OutlinedTextField(
                    value = designTitle,
                    onValueChange = { designTitle = it },
                    label = { Text("Judul Desain Karya") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )
            }

            item {
                Text(
                    text = "Auto-Mockup Generator & Pilihan Produk",
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp,
                    color = InkBlack
                )
            }

            items(mockups) { mockup ->
                SketchCard(
                    modifier = Modifier.fillMaxWidth(),
                    backgroundColor = if (mockup.enabled) PaperCard else PaperBackground,
                    cornerRadius = 12.dp,
                    shadowOffset = if (mockup.enabled) 3.dp else 1.dp
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(48.dp)
                                    .sketchBorderLight(cornerRadius = 8.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(CreativeVioletSoft),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(text = "${mockup.emoji} $selectedArtworkEmoji", fontSize = 16.sp)
                            }

                            Spacer(modifier = Modifier.width(12.dp))

                            Column {
                                Text(
                                    text = mockup.name,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 14.sp,
                                    color = if (mockup.enabled) InkBlack else InkMuted
                                )
                                Text(
                                    text = "Modal: ${mockup.baseCost.toRupiah()} · Royaltimu: ${mockup.royalty.toRupiah()}",
                                    fontSize = 11.sp,
                                    color = if (mockup.enabled) CreativeViolet else InkMuted,
                                    fontWeight = FontWeight.SemiBold
                                )
                            }
                        }

                        Switch(
                            checked = mockup.enabled,
                            onCheckedChange = { checked ->
                                val index = mockups.indexOf(mockup)
                                if (index != -1) {
                                    mockups[index] = mockup.copy(enabled = checked)
                                }
                            },
                            colors = SwitchDefaults.colors(
                                checkedThumbColor = PaperCard,
                                checkedTrackColor = CreativeViolet
                            )
                        )
                    }
                }
            }
        }
    }
}
