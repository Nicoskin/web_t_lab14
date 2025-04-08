document.addEventListener("DOMContentLoaded", () => {
  // Загружаем сохраненные данные
  document.querySelectorAll(".editable").forEach((el, index) => {
    const savedText = localStorage.getItem(`editable-${index}`);
    if (savedText) el.innerText = savedText;

    el.addEventListener("input", () => {
      localStorage.setItem(`editable-${index}`, el.innerText);
    });
  });

  // Ripple эффект
  document.querySelectorAll(".ripple").forEach(button => {
    button.addEventListener("click", function(e) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;

      let ripple = document.createElement("span");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add("ripple-effect"); // Добавляем класс для стилей ripple
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Кнопка "Скачать PDF"
  document.getElementById("downloadBtn").addEventListener("click", () => {
    const resume = document.querySelector(".resume");

    // Используем html2canvas для создания скриншота
    html2canvas(resume).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf; // Убедитесь, что jsPDF доступен

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 260); // Ширина и высота изображения в PDF
      pdf.save("resume.pdf");
    }).catch((error) => {
      console.error("Ошибка при создании PDF: ", error);
    });
  });
});
