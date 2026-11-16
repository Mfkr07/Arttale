package com.arttale.app.presentation.detail

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingBag
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.arttale.app.core.common.toRupiah
import com.arttale.app.core.theme.CreativeViolet
import com.arttale.app.core.theme.CreativeVioletSoft
import com.arttale.app.core.theme.InkBlack
import com.arttale.app.core.theme.InkBorder
import com.arttale.app.core.theme.InkMuted
import com.arttale.app.core.theme.PaperBackground
import com.arttale.app.core.theme.PaperCard
import com.arttale.app.core.theme.WarmYellow
import com.arttale.app.core.theme.sketchBorder
import com.arttale.app.core.theme.sketchBorderLight
import com.arttale.app.presentation.components.SketchButton
import com.arttale.app.presentation.components.SketchCard
import com.arttale.app.presentation.components.TipJarCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductDetailScreen(
    onNavigateBack: () -> Unit,
    onNavigateToCart: () -> Unit,
    viewModel: ProductDetailViewModel = hiltViewModel()
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    val context = LocalContext.current

    LaunchedEffect(Unit) {
        viewModel.eventFlow.collect { message ->
            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
        }
    }

    Scaffold(
        containerColor = PaperBackground,
        topBar = {
            TopAppBar(
                title = { Text("Detail Karya", fontWeight = FontWeight.Bold, fontSize = 18.sp) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Kembali")
                    }
                },
                actions = {
                    IconButton(onClick = onNavigateToCart) {
                        Icon(imageVector = Icons.Default.ShoppingBag, contentDescription = "Keranjang")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = PaperBackground)
            )
        },
        bottomBar = {
            if (state.product != null) {
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
                            Text(text = "Total Harga", fontSize = 11.sp, color = InkMuted)
                            Text(
                                text = state.totalPrice.toRupiah(),
                                fontWeight = FontWeight.Black,
                                fontSize = 18.sp,
                                color = InkBlack
                            )
                        }

                        SketchButton(
                            text = "+ Keranjang",
                            onClick = {
                                viewModel.addToCart {
                                    onNavigateToCart()
                                }
                            },
                            backgroundColor = CreativeViolet
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        if (state.isLoading) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(color = CreativeViolet)
            }
        } else if (state.product == null) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding),
                contentAlignment = Alignment.Center
            ) {
                Text(text = "Karya tidak ditemukan.", color = InkMuted)
            }
        } else {
            val product = state.product!!
            val scrollState = rememberScrollState()

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
                    .verticalScroll(scrollState)
                    .padding(16.dp)
            ) {
                // Interactive Mockup Box
                val activeBgColor = state.selectedColor?.let { Color(it.hex) } ?: Color(product.hexColor)

                SketchCard(
                    modifier = Modifier.fillMaxWidth(),
                    cornerRadius = 16.dp,
                    shadowOffset = 5.dp
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .aspectRatio(1.1f)
                            .background(activeBgColor),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = product.emoji,
                            fontSize = 110.sp
                        )

                        // Watermark / Brand Badge
                        Box(
                            modifier = Modifier
                                .align(Alignment.BottomStart)
                                .padding(12.dp)
                                .sketchBorderLight(cornerRadius = 6.dp)
                                .clip(RoundedCornerShape(6.dp))
                                .background(PaperCard.copy(alpha = 0.9f))
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text(
                                text = "Warna: ${state.selectedColor?.name ?: "Hitam"}",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = InkBlack
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Title & Artist
                Text(
                    text = product.displayTitle,
                    fontWeight = FontWeight.Black,
                    fontSize = 22.sp,
                    color = InkBlack
                )
                Text(
                    text = "Karya oleh ${product.artist} ✦",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = CreativeViolet
                )

                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = product.description,
                    fontSize = 13.sp,
                    color = InkMuted,
                    lineHeight = 18.sp
                )

                Spacer(modifier = Modifier.height(20.dp))

                // Color Variants
                Text(text = "Pilih Warna Kain / Mockup", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    product.availableColors.forEach { color ->
                        val isSelected = state.selectedColor?.name == color.name
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .sketchBorder(
                                    strokeWidth = if (isSelected) 2.5.dp else 1.5.dp,
                                    borderColor = if (isSelected) CreativeViolet else InkBorder,
                                    shadowOffset = if (isSelected) 2.dp else 0.dp,
                                    cornerRadius = 20.dp
                                )
                                .clip(CircleShape)
                                .background(Color(color.hex))
                                .clickable { viewModel.onColorSelected(color) }
                        )
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Size Variants
                Text(text = "Pilih Ukuran", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    product.availableSizes.forEach { size ->
                        val isSelected = state.selectedSize == size
                        Box(
                            modifier = Modifier
                                .sketchBorder(
                                    strokeWidth = 1.5.dp,
                                    borderColor = if (isSelected) CreativeViolet else InkBorder,
                                    shadowOffset = if (isSelected) 2.dp else 0.dp,
                                    cornerRadius = 8.dp
                                )
                                .clip(RoundedCornerShape(8.dp))
                                .background(if (isSelected) InkBlack else PaperCard)
                                .clickable { viewModel.onSizeSelected(size) }
                                .padding(horizontal = 16.dp, vertical = 8.dp)
                        ) {
                            Text(
                                text = size,
                                fontWeight = FontWeight.Bold,
                                color = if (isSelected) PaperCard else InkBlack,
                                fontSize = 13.sp
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Quality Variants
                Text(text = "Pilihan Kualitas Bahan", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    product.availableQualities.forEach { quality ->
                        val isSelected = state.selectedQuality?.id == quality.id
                        SketchCard(
                            modifier = Modifier.fillMaxWidth(),
                            backgroundColor = if (isSelected) CreativeVioletSoft else PaperCard,
                            borderColor = if (isSelected) CreativeViolet else InkBorder,
                            shadowOffset = if (isSelected) 2.dp else 0.dp,
                            cornerRadius = 10.dp,
                            onClick = { viewModel.onQualitySelected(quality) }
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(
                                        text = quality.label,
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 14.sp
                                    )
                                    Text(
                                        text = quality.desc,
                                        fontSize = 11.sp,
                                        color = InkMuted
                                    )
                                }
                                Text(
                                    text = if (quality.additionalPrice == 0L) "Bawaan" else "+ ${quality.additionalPrice.toRupiah()}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp,
                                    color = if (isSelected) CreativeViolet else InkBlack
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(22.dp))

                // Killer Feature: Tip Jar
                TipJarCard(
                    artistName = product.artist,
                    selectedTip = state.selectedTip,
                    onTipSelected = viewModel::onTipSelected
                )

                Spacer(modifier = Modifier.height(20.dp))

                // Quantity selector
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(text = "Jumlah Pesanan", fontWeight = FontWeight.Bold, fontSize = 14.sp)

                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .sketchBorderLight(cornerRadius = 8.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(PaperCard)
                                .clickable { viewModel.onQuantityChanged(-1) },
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(imageVector = Icons.Default.Remove, contentDescription = "Kurang")
                        }

                        Text(
                            text = state.quantity.toString(),
                            fontWeight = FontWeight.Black,
                            fontSize = 16.sp
                        )

                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .sketchBorderLight(cornerRadius = 8.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(PaperCard)
                                .clickable { viewModel.onQuantityChanged(1) },
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(imageVector = Icons.Default.Add, contentDescription = "Tambah")
                        }
                    }
                }

                Spacer(modifier = Modifier.height(30.dp))
            }
        }
    }
}
