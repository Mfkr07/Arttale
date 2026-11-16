package com.arttale.app.presentation.checkout

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.QrCode
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
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
import com.arttale.app.core.theme.WarmYellowSoft
import com.arttale.app.core.theme.sketchBorder
import com.arttale.app.core.theme.sketchBorderLight
import com.arttale.app.presentation.cart.CartViewModel
import com.arttale.app.presentation.components.SketchButton
import com.arttale.app.presentation.components.SketchCard
import kotlinx.coroutines.launch

data class CourierOption(val id: String, val name: String, val eta: String, val price: Long, val icon: String)
data class PaymentOption(val id: String, val name: String, val desc: String, val icon: String)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CheckoutScreen(
    onNavigateBack: () -> Unit,
    onOrderSuccess: () -> Unit,
    cartViewModel: CartViewModel = hiltViewModel()
) {
    val cartState by cartViewModel.uiState.collectAsStateWithLifecycle()
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    var name by remember { mutableStateOf("Budi Wicaksono") }
    var phone by remember { mutableStateOf("0812-3456-7890") }
    var address by remember { mutableStateOf("Jl. Dago Asri No. 12, Bandung") }

    val couriers = listOf(
        CourierOption("reg", "J&T Reguler", "2-3 hari", 12_000, "🛵"),
        CourierOption("exp", "SiCepat Express", "1 hari", 22_000, "🚚"),
        CourierOption("smd", "GoSend SameDay", "Hari ini", 35_000, "⚡")
    )
    var selectedCourier by remember { mutableStateOf(couriers.first()) }

    val payments = listOf(
        PaymentOption("qris", "QRIS Instant", "Scan dari semua e-wallet & m-banking", "📱"),
        PaymentOption("gopay", "GoPay / GoPay Later", "Konfirmasi 1-klik", "🟢"),
        PaymentOption("va", "BCA / Mandiri / BRI VA", "Verifikasi otomatis 24 jam", "🏦")
    )
    var selectedPayment by remember { mutableStateOf(payments.first()) }

    var showSuccessDialog by remember { mutableStateOf(false) }

    // Shipping subsidy if subtotal > 200k
    val subsidy = if (cartState.subtotal > 200_000) 10_000L else 0L
    val finalShipping = (selectedCourier.price - subsidy).coerceAtLeast(0L)
    val grandTotal = cartState.total + finalShipping

    Scaffold(
        containerColor = PaperBackground,
        topBar = {
            TopAppBar(
                title = { Text("Checkout & Pembayaran", fontWeight = FontWeight.Bold, fontSize = 18.sp) },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(imageVector = Icons.Default.ArrowBack, contentDescription = "Kembali")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = PaperBackground)
            )
        },
        bottomBar = {
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
                        Text(text = "Grand Total", fontSize = 11.sp, color = InkMuted)
                        Text(
                            text = grandTotal.toRupiah(),
                            fontWeight = FontWeight.Black,
                            fontSize = 19.sp,
                            color = InkBlack
                        )
                    }

                    SketchButton(
                        text = "Bayar Sekarang 🔒",
                        onClick = {
                            if (name.isBlank() || address.isBlank()) {
                                Toast.makeText(context, "Mohon lengkapi alamat pengiriman!", Toast.LENGTH_SHORT).show()
                            } else {
                                showSuccessDialog = true
                            }
                        },
                        backgroundColor = CreativeViolet
                    )
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Address Section
            Text(text = "📍 Alamat Pengiriman", fontWeight = FontWeight.Bold, fontSize = 15.sp)
            SketchCard(modifier = Modifier.fillMaxWidth(), cornerRadius = 12.dp, shadowOffset = 3.dp) {
                Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    OutlinedTextField(
                        value = name,
                        onValueChange = { name = it },
                        label = { Text("Nama Penerima") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    OutlinedTextField(
                        value = phone,
                        onValueChange = { phone = it },
                        label = { Text("Nomor WhatsApp") },
                        modifier = Modifier.fillMaxWidth(),
                        singleLine = true
                    )
                    OutlinedTextField(
                        value = address,
                        onValueChange = { address = it },
                        label = { Text("Alamat Lengkap & Kota") },
                        modifier = Modifier.fillMaxWidth(),
                        maxLines = 2
                    )
                }
            }

            // Courier Section
            Text(text = "🚚 Pilihan Kurir Logistik", fontWeight = FontWeight.Bold, fontSize = 15.sp)
            if (subsidy > 0) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .sketchBorderLight(cornerRadius = 8.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(WarmYellowSoft)
                        .padding(10.dp)
                ) {
                    Text(
                        text = "🎉 Kamu hemat Rp 10.000 potongan subsidi ongkir!",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = InkBlack
                    )
                }
            }

            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                couriers.forEach { courier ->
                    val isSelected = selectedCourier.id == courier.id
                    SketchCard(
                        modifier = Modifier.fillMaxWidth(),
                        backgroundColor = if (isSelected) CreativeVioletSoft else PaperCard,
                        borderColor = if (isSelected) CreativeViolet else InkBorder,
                        shadowOffset = if (isSelected) 2.dp else 0.dp,
                        cornerRadius = 10.dp,
                        onClick = { selectedCourier = courier }
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(text = courier.icon, fontSize = 20.sp)
                                Spacer(modifier = Modifier.width(10.dp))
                                Column {
                                    Text(text = courier.name, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                    Text(text = "Estimasi: ${courier.eta}", fontSize = 11.sp, color = InkMuted)
                                }
                            }
                            Text(
                                text = courier.price.toRupiah(),
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                color = InkBlack
                            )
                        }
                    }
                }
            }

            // Payment Methods
            Text(text = "💳 Metode Pembayaran", fontWeight = FontWeight.Bold, fontSize = 15.sp)
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                payments.forEach { pay ->
                    val isSelected = selectedPayment.id == pay.id
                    SketchCard(
                        modifier = Modifier.fillMaxWidth(),
                        backgroundColor = if (isSelected) CreativeVioletSoft else PaperCard,
                        borderColor = if (isSelected) CreativeViolet else InkBorder,
                        shadowOffset = if (isSelected) 2.dp else 0.dp,
                        cornerRadius = 10.dp,
                        onClick = { selectedPayment = pay }
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = pay.icon, fontSize = 22.sp)
                            Spacer(modifier = Modifier.width(10.dp))
                            Column {
                                Text(text = pay.name, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                Text(text = pay.desc, fontSize = 11.sp, color = InkMuted)
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))
        }

        if (showSuccessDialog) {
            AlertDialog(
                onDismissRequest = {},
                confirmButton = {
                    TextButton(
                        onClick = {
                            showSuccessDialog = false
                            cartViewModel.onClearCart()
                            onOrderSuccess()
                        }
                    ) {
                        Text(text = "Selesai & Lacak Pesanan", fontWeight = FontWeight.Bold, color = CreativeViolet)
                    }
                },
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(text = "🎉 ", fontSize = 24.sp)
                        Text(text = "Pesanan Berhasil Dibuat!", fontWeight = FontWeight.Bold)
                    }
                },
                text = {
                    Text(
                        text = "Nomor pesanan: INK-2026-8812\n\nInstruksi work order otomatis telah diteruskan ke vendor percetakan terdekat. Tip sebesar ${cartState.totalTip.toRupiah()} telah diteruskan ke seniman favoritmu!",
                        fontSize = 13.sp,
                        color = InkBlack,
                        lineHeight = 18.sp
                    )
                },
                containerColor = PaperCard,
                shape = RoundedCornerShape(14.dp)
            )
        }
    }
}
