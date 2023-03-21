// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

window.downloadCsv = function(response) {
  const filename = response.filename;
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const data = response.data.map((record)=>record.join(',')).join('\r\n');
  const blob = new Blob([bom, data], {type: "text/csv"});

  const url = (window.URL || window.webkitURL).createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = filename;
  downloadLink.click();

  (window.URL || window.webkitURL).revokeObjectURL(url);
}

$(document).on("click", "#download_link", function(e) {
  e.preventDefault();
  let _this = $(this);

  $.ajax({
    type: "get",
    dataType: "json",
    url: "users/download",
  }).done(function(response, status, xhr) {
    downloadCsv(response);
  }).fail(function(data, status, xhr) {
    alert(status);
  }).always(function (data, status) {
  })
})
