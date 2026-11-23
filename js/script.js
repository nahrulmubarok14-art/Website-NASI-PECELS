/*
  NASI PECELS | js/script.js
  Tugas 1 WebPro, Kelompok 4

  Prinsip: situs tetap bisa dibaca tanpa JavaScript. Semua fungsi di bawah hanya
  menambah kemudahan dan gerak. Tujuan tiap fungsi ditulis di atasnya.
*/

(function () {
  "use strict";

  // Pengguna yang mematikan animasi di perangkatnya tidak diberi gerak tambahan.
  var kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var header = document.querySelector("header");
  var halaman = document.body;

  /* ---------- 1. Penanda halaman aktif ----------
     Tujuan: pengunjung tahu sedang berada di halaman mana. */
  function tandaiHalamanAktif() {
    var namaFile = location.pathname.split("/").pop() || "index.html";
    var tautan = document.querySelectorAll("nav a");

    tautan.forEach(function (a) {
      if (a.getAttribute("href") === namaFile) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- 2. Tombol menu untuk layar sempit ----------
     Tujuan: menu tidak memenuhi layar ponsel. Tombol diberi aria-expanded. */
  function buatTombolMenu() {
    var nav = header.querySelector("nav");
    if (!nav) return;

    nav.id = "nav-utama";

    var tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = "menu-tombol";
    tombol.setAttribute("aria-expanded", "false");
    tombol.setAttribute("aria-controls", "nav-utama");
    tombol.innerHTML = '<span class="garis-menu" aria-hidden="true"></span><span>Menu</span>';
    header.insertBefore(tombol, nav);

    function atur(buka) {
      nav.classList.toggle("buka", buka);
      tombol.setAttribute("aria-expanded", String(buka));
    }

    tombol.addEventListener("click", function () {
      atur(tombol.getAttribute("aria-expanded") !== "true");
    });

    // Escape menutup menu dan mengembalikan fokus ke tombol.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("buka")) {
        atur(false);
        tombol.focus();
      }
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) atur(false);
    });
  }

  /* ---------- 3. Bilah progres, header, tombol ke atas, paralaks ----------
     Tujuan:
     - bilah merah menunjukkan posisi baca pada halaman panjang
     - header menyingkir saat membaca ke bawah agar layar lebih lega, muncul lagi saat menggulir ke atas
     - tombol ke atas mempercepat kembali ke menu
     - foto banner bergeser pelan agar beranda terasa hidup */
  function buatPelacakGulir() {
    var bilah = document.createElement("div");
    bilah.className = "progres";
    bilah.setAttribute("aria-hidden", "true");
    document.body.appendChild(bilah);

    var keAtas = document.createElement("button");
    keAtas.type = "button";
    keAtas.className = "ke-atas";
    keAtas.setAttribute("aria-label", "Kembali ke atas halaman");
    document.body.appendChild(keAtas);

    keAtas.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: kurangiGerak ? "auto" : "smooth" });
    });

    var gambarBanner = document.querySelector(".beranda main > section:first-of-type > figure img");
    var yTerakhir = window.scrollY;
    var menunggu = false;

    function perbarui() {
      var y = window.scrollY;
      var tinggiGulir = document.documentElement.scrollHeight - window.innerHeight;
      var nav = header.querySelector("nav");
      var menuTerbuka = nav && nav.classList.contains("buka");

      // bilah progres
      var proporsi = tinggiGulir > 0 ? y / tinggiGulir : 0;
      document.documentElement.style.setProperty("--progres", proporsi.toFixed(4));

      // header
      var turun = y > yTerakhir + 4;
      var naik = y < yTerakhir - 4;
      if (y > 160 && turun && !menuTerbuka && !header.contains(document.activeElement)) {
        header.classList.add("sembunyi");
      } else if (naik || y <= 160) {
        header.classList.remove("sembunyi");
      }
      yTerakhir = y;

      // tombol ke atas
      keAtas.classList.toggle("tampil", y > 600);

      // paralaks banner, hanya pada 700px pertama
      if (gambarBanner && !kurangiGerak && y < 700) {
        gambarBanner.style.setProperty("--geser", (y * 0.12).toFixed(1) + "px");
      }

      menunggu = false;
    }

    // requestAnimationFrame menjaga gulir tetap halus
    window.addEventListener(
      "scroll",
      function () {
        if (!menunggu) {
          menunggu = true;
          window.requestAnimationFrame(perbarui);
        }
      },
      { passive: true }
    );

    // header muncul lagi bila elemen di dalamnya difokuskan dengan keyboard
    header.addEventListener("focusin", function () {
      header.classList.remove("sembunyi");
    });

    perbarui();
  }

  /* ---------- 4. Judul beranda muncul kata demi kata ----------
     Tujuan: satu momen pembuka yang terarah. Halaman lain tidak memakainya. */
  function pecahJudulBeranda() {
    if (kurangiGerak || !halaman.classList.contains("beranda")) return;

    var judul = document.querySelector("main h1");
    if (!judul) return;

    var teks = judul.textContent.trim();
    var daftarKata = teks.split(/\s+/);

    judul.setAttribute("aria-label", teks);
    judul.textContent = "";

    daftarKata.forEach(function (kata, i) {
      var luar = document.createElement("span");
      luar.className = "kata";
      luar.setAttribute("aria-hidden", "true");

      var dalam = document.createElement("span");
      dalam.style.setProperty("--urut", i);
      dalam.textContent = kata;

      luar.appendChild(dalam);
      judul.appendChild(luar);

      if (i < daftarKata.length - 1) {
        judul.appendChild(document.createTextNode(" "));
      }
    });
  }

  /* ---------- 5. Kemunculan saat digulir ----------
     Tujuan: konten muncul sesuai urutan baca. Kartu naik pelan, foto dibuka
     seperti tirai. Kelas dilepas setelah selesai agar efek hover tidak tertunda. */
  function munculSaatDigulir() {
    if (kurangiGerak || !("IntersectionObserver" in window)) return;

    var sasaran = [];
    var pembukaBeranda = document.querySelector(".beranda main > section:first-of-type");

    document.querySelectorAll("main > section").forEach(function (bagian) {
      if (bagian === pembukaBeranda) return; // sudah punya animasi pembuka sendiri

      var kartu = bagian.querySelectorAll(":scope > article, :scope > ol > li, :scope > ul > li");

      if (kartu.length > 0) {
        var judulBagian = bagian.querySelector(":scope > h2");
        if (judulBagian) sasaran.push(judulBagian);
        kartu.forEach(function (k) {
          sasaran.push(k);
        });
      } else {
        sasaran.push(bagian);
      }
    });

    var pengamat = new IntersectionObserver(
      function (daftar) {
        var urut = 0;

        daftar.forEach(function (entri) {
          if (!entri.isIntersecting) return;

          var el = entri.target;
          el.style.setProperty("--tunda", Math.min(urut * 90, 450) + "ms");
          el.classList.add("tampil");
          urut += 1;
          pengamat.unobserve(el);

          window.setTimeout(function () {
            el.classList.remove("reveal", "tampil");
            el.style.removeProperty("--tunda");
          }, 2200);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    sasaran.forEach(function (el) {
      el.classList.add("reveal");
      pengamat.observe(el);
    });
  }

  /* ---------- 6. Garis tahap pada halaman proses ----------
     Tujuan: garis merah memanjang mengikuti tahap yang sedang dibaca,
     sehingga urutan 7 tahap terasa sebagai satu alur. */
  function buatGarisTahap() {
    var daftar = document.querySelector(".proses main ol");
    if (!daftar) return;

    var langkah = daftar.querySelectorAll(":scope > li");
    var menunggu = false;

    function hitung() {
      var kotak = daftar.getBoundingClientRect();
      var titikBaca = window.innerHeight * 0.55;
      var panjang = Math.min(Math.max(titikBaca - kotak.top, 0), kotak.height);

      daftar.style.setProperty("--progres-tahap", panjang + "px");

      langkah.forEach(function (li) {
        li.classList.toggle("tercapai", li.getBoundingClientRect().top + 40 < titikBaca);
      });

      menunggu = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!menunggu) {
          menunggu = true;
          window.requestAnimationFrame(hitung);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", hitung);
    hitung();
  }

  /* ---------- 7. Tabel bisa digulir ke samping di layar sempit ----------
     Tujuan: halaman tidak melebar karena tabel. Area gulir bisa dijangkau keyboard. */
  function bungkusTabel() {
    document.querySelectorAll("main table").forEach(function (tabel) {
      var pembungkus = document.createElement("div");
      var keterangan = tabel.querySelector("caption");

      pembungkus.className = "gulung";
      pembungkus.tabIndex = 0;
      pembungkus.setAttribute("role", "region");
      pembungkus.setAttribute("aria-label", keterangan ? keterangan.textContent : "Tabel");

      tabel.parentNode.insertBefore(pembungkus, tabel);
      pembungkus.appendChild(tabel);
    });
  }

  /* ---------- 8. Foto bisa diperbesar ----------
     Tujuan: pelanggan melihat detail makanan. Memakai elemen dialog bawaan,
     sehingga Escape menutup dan fokus kembali ke foto yang dibuka. */
  function buatPerbesarFoto() {
    var semuaGambar = document.querySelectorAll("main figure img");
    if (semuaGambar.length === 0 || typeof HTMLDialogElement === "undefined") return;

    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Foto diperbesar");
    dialog.innerHTML =
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<form method="dialog"><button type="submit">Tutup</button></form>';
    document.body.appendChild(dialog);

    var fotoBesar = dialog.querySelector("img");
    var teksFoto = dialog.querySelector("figcaption");

    semuaGambar.forEach(function (gambar) {
      var figur = gambar.closest("figure");

      // banner beranda sudah berukuran penuh, tidak perlu diperbesar
      if (halaman.classList.contains("beranda") && figur.parentElement.matches("section:first-of-type")) return;

      var tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className = "buka-gambar";
      tombol.setAttribute("aria-label", "Perbesar foto: " + gambar.alt);
      gambar.parentNode.insertBefore(tombol, gambar);
      tombol.appendChild(gambar);

      tombol.addEventListener("click", function () {
        var keterangan = figur.querySelector("figcaption");
        fotoBesar.src = gambar.currentSrc || gambar.src;
        fotoBesar.alt = gambar.alt;
        teksFoto.textContent = keterangan ? keterangan.textContent : gambar.alt;
        dialog.showModal();
      });
    });

    // klik di luar foto menutup dialog
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  /* ---------- 9. Filter menu ----------
     Tujuan: pelanggan yang hanya mencari minuman tidak perlu menggulir melewati lauk.
     Tombol memakai aria-pressed dan hasilnya diumumkan lewat area status. */
  function buatFilterMenu() {
    if (!halaman.classList.contains("menu")) return;

    var bagian = Array.prototype.slice.call(document.querySelectorAll("main > section"));

    function cari(kataKunci) {
      return bagian.find(function (b) {
        var h2 = b.querySelector("h2");
        return h2 && h2.textContent.indexOf(kataKunci) !== -1;
      });
    }

    var utama = cari("Menu Utama");
    var lauk = cari("Lauk");
    var minuman = cari("Minuman");
    var pembuka = bagian[0];
    if (!utama || !lauk || !minuman || !pembuka) return;

    var pilihan = [
      { nama: "Semua", tampil: [utama, lauk, minuman] },
      { nama: "Menu utama", tampil: [utama] },
      { nama: "Lauk tambahan", tampil: [lauk] },
      { nama: "Minuman", tampil: [minuman] }
    ];

    var grup = document.createElement("div");
    grup.className = "filter";
    grup.setAttribute("role", "group");
    grup.setAttribute("aria-label", "Saring daftar menu");

    var status = document.createElement("p");
    status.className = "hanya-baca";
    status.setAttribute("role", "status");

    function terapkan(pilih, tombolAktif) {
      grup.querySelectorAll("button").forEach(function (t) {
        t.setAttribute("aria-pressed", String(t === tombolAktif));
      });

      [utama, lauk, minuman].forEach(function (sec) {
        if (pilih.tampil.indexOf(sec) !== -1) {
          sec.hidden = false;
          window.requestAnimationFrame(function () {
            sec.classList.remove("kelompok-keluar");
          });
        } else {
          sec.classList.add("kelompok-keluar");
          window.setTimeout(function () {
            if (sec.classList.contains("kelompok-keluar")) sec.hidden = true;
          }, kurangiGerak ? 0 : 300);
        }
      });

      status.textContent = "Menampilkan: " + pilih.nama;
    }

    pilihan.forEach(function (pilih, i) {
      var tombol = document.createElement("button");
      tombol.type = "button";
      tombol.textContent = pilih.nama;
      tombol.setAttribute("aria-pressed", String(i === 0));
      tombol.addEventListener("click", function () {
        terapkan(pilih, tombol);
      });
      grup.appendChild(tombol);
    });

    pembuka.appendChild(grup);
    pembuka.appendChild(status);
  }

  /* ---------- 10. Pilihan panas atau dingin pada minuman ----------
     Tujuan: satu harga ditampilkan sesuai pilihan, tidak dua harga sekaligus.
     Daftar harga asli tetap ada di HTML dan disembunyikan, jadi aman tanpa JavaScript. */
  function buatPilihSuhu() {
    if (!halaman.classList.contains("menu")) return;

    document.querySelectorAll("main article").forEach(function (kartu) {
      var daftar = kartu.querySelector(":scope > ul");
      if (!daftar || daftar.children.length < 2) return;

      var judul = kartu.querySelector("h3");
      var barisHarga = Array.prototype.find.call(kartu.children, function (el) {
        return el.tagName === "P" && el.firstElementChild && el.firstElementChild.tagName === "STRONG";
      });

      var data = Array.prototype.map.call(daftar.children, function (li) {
        var potong = li.textContent.split(":");
        return { label: potong[0].trim(), harga: (potong[1] || "").trim() };
      });

      // hanya daftar harga bertipe "Panas: ..." dan "Dingin: ..." yang diubah
      var hanyaSuhu = data.every(function (item) {
        return item.label === "Panas" || item.label === "Dingin";
      });
      if (!hanyaSuhu) return;

      var grup = document.createElement("div");
      grup.className = "pilih-suhu";
      grup.setAttribute("role", "group");
      grup.setAttribute("aria-label", "Pilih penyajian " + (judul ? judul.textContent : "minuman"));

      var tampilHarga = document.createElement("p");
      tampilHarga.className = "harga-suhu";
      tampilHarga.setAttribute("aria-live", "polite");

      var tombolTombol = data.map(function (item, i) {
        var tombol = document.createElement("button");
        tombol.type = "button";
        tombol.textContent = item.label;
        tombol.addEventListener("click", function () {
          pilih(i);
        });
        grup.appendChild(tombol);
        return tombol;
      });

      function pilih(i) {
        tombolTombol.forEach(function (t, j) {
          t.setAttribute("aria-pressed", String(i === j));
        });

        tampilHarga.textContent = "";
        var tebal = document.createElement("strong");
        tebal.textContent = "Harga " + data[i].label.toLowerCase() + ":";
        tampilHarga.appendChild(tebal);
        tampilHarga.appendChild(document.createTextNode(" " + data[i].harga));
      }

      pilih(0);

      if (barisHarga) barisHarga.hidden = true;
      daftar.hidden = true;
      kartu.appendChild(grup);
      kartu.appendChild(tampilHarga);
    });
  }

  /* ---------- 11. Tombol salin nomor WhatsApp ----------
     Tujuan: pelanggan di komputer bisa memindahkan nomor ke ponselnya tanpa mengetik ulang. */
  var elemenToast = null;
  var penghitungToast = null;

  function tampilToast(pesan) {
    if (!elemenToast) {
      elemenToast = document.createElement("div");
      elemenToast.className = "toast";
      elemenToast.setAttribute("role", "status");
      document.body.appendChild(elemenToast);
    }

    elemenToast.textContent = pesan;
    elemenToast.classList.add("tampil");

    window.clearTimeout(penghitungToast);
    penghitungToast = window.setTimeout(function () {
      elemenToast.classList.remove("tampil");
    }, 2400);
  }

  function salinManual(teks) {
    var area = document.createElement("textarea");
    area.value = teks;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();

    var berhasil = false;
    try {
      berhasil = document.execCommand("copy");
    } catch (galat) {
      berhasil = false;
    }

    document.body.removeChild(area);
    return berhasil;
  }

  function buatTombolSalin() {
    var tautan = document.querySelector('a[href^="tel:"]');
    if (!tautan) return;

    var tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = "salin";
    tombol.textContent = "Salin nomor";
    tautan.insertAdjacentElement("afterend", tombol);

    tombol.addEventListener("click", function () {
      var nomor = tautan.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(nomor).then(
          function () {
            tampilToast("Nomor " + nomor + " tersalin.");
          },
          function () {
            tampilToast(salinManual(nomor) ? "Nomor " + nomor + " tersalin." : "Gagal menyalin. Salin nomor secara manual.");
          }
        );
      } else {
        tampilToast(salinManual(nomor) ? "Nomor " + nomor + " tersalin." : "Gagal menyalin. Salin nomor secara manual.");
      }
    });
  }

  /* ---------- 12. Transisi antarhalaman ----------
     Tujuan: perpindahan halaman terasa menyambung. Halaman memudar sebentar sebelum berpindah. */
  function transisiHalaman() {
    if (kurangiGerak) return;

    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;

      var tujuan = new URL(a.href, location.href);
      var halamanSama = tujuan.protocol === location.protocol && tujuan.host === location.host;
      if (!halamanSama || tujuan.pathname === location.pathname) return;

      e.preventDefault();
      halaman.classList.add("keluar");
      window.setTimeout(function () {
        location.href = a.href;
      }, 260);
    });

    // tombol "kembali" pada browser memulihkan halaman dari cache
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) halaman.classList.remove("keluar");
    });
  }

  /* ---------- Jalankan semua ---------- */
  tandaiHalamanAktif();
  buatTombolMenu();
  bungkusTabel();
  buatPilihSuhu();
  buatFilterMenu();
  buatPerbesarFoto();
  buatTombolSalin();
  pecahJudulBeranda();
  munculSaatDigulir();
  buatGarisTahap();
  buatPelacakGulir();
  transisiHalaman();
})();
