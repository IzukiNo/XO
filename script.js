let hienTai = "X";
let table = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let count = 0;
let over = false;

function SetTable(table, str, n) {
  let array = str.split(":");
  let i = parseInt(array[0]);
  let j = parseInt(array[1]);
  table[i][j] = n;
}

function Reset() {
  $("td").text("");
  table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  hienTai = "X";
  count = 0;
  over = false;
}

function CheckWin(a) {
  let j = 0;
  let i = 0;
  for (i = 0; i < 3; i++) {
    if (a[i][j] == a[i][j + 1] && a[i][j] == a[i][j + 2] && a[i][j] != 0) {
      return true;
    }
  }
  for (i = 0; i < 3; i++) {
    if (a[j][i] == a[j + 1][i] && a[j][i] == a[j + 2][i] && a[j][i] != 0) {
      return true;
    }
  }
  if (a[0][0] == a[1][1] && a[0][0] == a[2][2] && a[0][0] != 0) {
    return true;
  }
  if (a[0][2] == a[1][1] && a[0][2] == a[2][0] && a[0][2] != 0) {
    return true;
  }
  return false;
}

$(document).ready(function () {
  $("td").click(function () {
    if (!over) {
      if ($(this).text() == "") {
        count += 1;
        let str = $(this).attr("class");
        $(this).text(hienTai);
        if (hienTai == "X") {
          SetTable(table, str, 1);
          hienTai = "O";
        } else {
          SetTable(table, str, 2);
          hienTai = "X";
        }
      }

      if (count == 9) {
        Swal.fire({
          title: "Màn chơi đã huề",
          text: "Làm lại cuộc chơi đi bạn!",
          icon: "warning",
          focusConfirm: false,
          confirmButtonText: `
              <i class="fa fa-thumbs-up"></i> Ok cu!
            `,
        }).then((result) => {
          if (result.isConfirmed) {
            Reset();
          }
        });
      }

      if (CheckWin(table)) {
        if (hienTai == "O") {
          Swal.fire({
            title: "Người chơi X đã thắng",
            text: "Chúc mừng!",
            focusConfirm: false,
            confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> Tuyệt!
          `,
            imageUrl: "over.png",
            imageWidth: 400,
            imageHeight: 80,
            imageAlt: "Custom image",
          }).then((result) => {
            if (result.isConfirmed) {
              Reset();
            }
          });
        } else {
          Swal.fire({
            title: "Người chơi O đã thắng",
            text: "Chúc mừng!",
            focusConfirm: false,
            confirmButtonText: `
              <i class="fa fa-thumbs-up"></i> Xịn bây!
            `,
            imageUrl: "over.png",
            imageWidth: 400,
            imageHeight: 80,
            imageAlt: "Custom image",
          }).then((result) => {
            if (result.isConfirmed) {
              Reset();
            }
          });
        }
        over = true;
      }
    }
  });

  $("button").click(function () {
    $(".wrap").removeClass("active");

    Swal.fire({
      title: "Đã reset màn chơi",
      icon: "success",
    });

    Reset();
  });
});
