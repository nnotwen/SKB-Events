// BASKETBALL SCHEDULE
const basketballSchedule = {
  category: {
    0: "Midget",
    1: "Junior",
    2: "Senior",
  },
  month: {
    7: "August",
    8: "September",
  },
  // Not automatically sorted, please manually sort first
  days: [
    ["August", 7, [4, "6A", 0], [7, "6A", 2], ["2A", 7, 1]],
    ["August", 9, [3, 7, 0], [3, 1, 2], [5, "2B", 1]],
  ],
};

// BASKETBALL STANDING
const basketballStanding = {
  midget: {
    1: [],
    "2A": [],
    "2B": [],
    3: [],
    4: [[110, 112]],
    5: [],
    "6A": [[112, 110]],
    "6B": [],
    7: [],
  },
  junior: {
    1: [],
    "2A": [[88, 89]],
    "2B": [],
    3: [],
    "4A": [],
    "4B": [],
    5: [],
    "6A": [],
    "6B": [],
    7: [[89, 88]],
  },
  senior: {
    1: [],
    "2A": [],
    "2B": [],
    3: [],
    "4A": [],
    "4B": [],
    5: [],
    "6A": [[91, 94]],
    "6B": [],
    7: [[94, 91]],
  },
};

// VOLLEYBALL SCHEDULE
const volleyballSchedule = {
  category: {
    0: "Men",
    1: "Women",
  },
  month: {
    7: "August",
    8: "September",
  },
  // Not automatically sorted, please manually sort first
  // Month, day, ...[P1, P2, category]
  days: [
    ["August", 10, ["6B", 3, 1], [1, 4, 1], [6, 7, 0], ["2A", "4A", 0]],
    ["August", 15, [7, "6A", 1], [3, "2A", 1], ["2B", 3, 0], [5, 1, 0]],
    ["August", 17, ["6A", 1, 1], [4, "6B", 1], [1, "2B", 0], [3, "2A", 0]],
    ["August", 22, [1, "2A", 1], [7, 3, 1], ["4A", 6, 0], [7, "4B", 0]],
    [
      "August",
      24,
      ["6A", 4, 1],
      ["2A", "6B", 1],
      ["2A", "4B", 0],
      ["2B", 7, 0],
    ],
    ["August", 29, [4, 7, 1], [3, 1, 1], [5, "4A", 0], [1, 3, 0]],
    ["August", 31, [7, "6B", 1], ["6A", "2A", 1], [3, 5, 0], ["4A", "2B", 0]],
    ["September", 5, [4, 3, 1], ["6B", 1, 1], [7, "2A", 0], [3, 6, 0]],
    ["September", 7, [3, "6A", 1], ["2A", 7, 1], ["2B", 6, 0], [5, "4B", 0]],
    ["September", 12, ["2A", 4, 1], ["6B", "6A", 1], [1, 7, 0], [3, "4A", 0]],
  ],
};

// VOLLEYBALL STANDING
// Format [Team Score, Opponent Score]
const volleyballStanding = {
  men: {
    1: [],
    "2A": [],
    "2B": [],
    3: [],
    "4A": [],
    "4B": [],
    5: [],
    "6A": [],
    "6B": [],
    7: [],
  },
  women: {
    1: [],
    "2A": [],
    "2B": [],
    3: [],
    "4A": [],
    "4B": [],
    5: [],
    "6A": [],
    "6B": [],
    7: [],
  },
};

// LIGHT/DARK MODE PERSISTENCY
$(function () {
  const theme = localStorage.getItem("bs-theme") || "dark"; // dark is the default theme
  $("html").attr("data-bs-theme", theme);
  $(".theme-icon")
    .removeClass(theme === "dark" ? "bi-cloud-moon" : "bi-cloud-sun")
    .addClass(theme === "dark" ? "bi-cloud-sun" : "bi-cloud-moon");
  $(".theme-name").html(theme === "dark" ? "Light Mode" : "Dark Mode");
});

// LIGHT/DARK MODE TOGGLE
$(function () {
  $("#theme-toggle").on("click", function () {
    const $theme = $("html").attr("data-bs-theme");
    // Whole webpage theme
    $("html").attr("data-bs-theme", $theme === "dark" ? "light" : "dark");
    // Toggler icon
    $(".theme-icon")
      .removeClass($theme === "dark" ? "bi-cloud-sun" : "bi-cloud-moon")
      .addClass($theme === "dark" ? "bi-cloud-moon" : "bi-cloud-sun");
    // Toggler label
    $(".theme-name").html($theme === "dark" ? "Dark Mode" : "Light Mode");
    // Set to localStorage
    localStorage.setItem("bs-theme", $theme === "dark" ? "light" : "dark");
  });
});

moment.updateLocale("en", {
  invalidDate: "--",
});

$(function () {
  const $summary = $("#basketball-schedule-tab-pane .schedule-summary");
  const $groupSummary = $('<div class="card-group"></div>').appendTo($summary);

  const months = basketballSchedule.month;
  const days = basketballSchedule.days;
  const category = basketballSchedule.category;

  const month = new Date().getMonth();
  const day = new Date().getDate();

  let index = days.findIndex(
    (x) => (x[0] === months[month] && x[1] >= day) || x[0] === months[month + 1]
  );

  if (index == -1) index = days.length;

  for (const i of [index - 1, index, index + 1]) {
    const heading = days[i]
      ? `${days[i][0]} ${days[i][1]}, 2023`
      : "No schedule";

    const footer = moment(new Date(heading)).add(18.5, "hours").calendar();
    const card = sfcard(
      heading,
      days[i] ? days[i].slice(2) : [],
      category,
      footer
    );

    if (i !== index) {
      card.addClass("d-none d-sm-flex");
    }

    $groupSummary.append(card);
  }

  const $detailed = $("#basketball-schedule-tab-pane .schedule-detailed");
  const $groupDetailed = $(
    '<table class="table table-striped table-hover text-center"></table>'
  ).appendTo($detailed);

  const $tablehead = $("<thead></thead>").appendTo($groupDetailed);
  const $tablebody = $("<tbody class='align-middle'></tbody>").appendTo(
    $groupDetailed
  );

  const $headtr = $("<tr></tr>");
  for (const col of ["Date", "Game 1", "Game 2", "Game 3"]) {
    const $th = $(`<th scope="col">${col}</th>`).appendTo($headtr);
    if (col === "Date") $th.addClass("text-start");
  }
  $headtr.appendTo($tablehead);

  for (const row of days) {
    const $tr = $("<tr></tr>").appendTo($tablebody);
    $(`<td><small>${row[0]} ${row[1]}, 2023</small></td>`)
      .addClass("text-start")
      .appendTo($tr);
    for (const item of row.splice(2)) {
      $(
        `<td><small>${item[0]} vs ${item[1]} (${
          category[item[2]]
        })</small></td>`
      ).appendTo($tr);
    }
  }
});

$(function () {
  const $summary = $("#volleyball-schedule-tab-pane .schedule-summary");
  const $groupSummary = $('<div class="card-group"></div>').appendTo($summary);

  const months = volleyballSchedule.month;
  const days = volleyballSchedule.days;
  const category = volleyballSchedule.category;

  const month = new Date().getMonth();
  const day = new Date().getDate();

  let index = days.findIndex(
    (x) => (x[0] === months[month] && x[1] >= day) || x[0] === months[month + 1]
  );

  if (index == -1) index = days.length;

  for (const i of [index - 1, index, index + 1]) {
    const heading = days[i]
      ? `${days[i][0]} ${days[i][1]}, 2023`
      : "No schedule";

    const footer = moment(new Date(heading)).add(18.5, "hours").calendar();
    const card = sfcard(
      heading,
      days[i] ? days[i].slice(2) : [],
      category,
      footer
    );

    if (i !== index) {
      card.addClass("d-none d-sm-flex");
    }

    $groupSummary.append(card);
  }

  const $detailed = $("#volleyball-schedule-tab-pane .schedule-detailed");
  const $groupDetailed = $(
    '<table class="table table-striped table-hover text-center"></table>'
  ).appendTo($detailed);

  const $tablehead = $("<thead></thead>").appendTo($groupDetailed);
  const $tablebody = $("<tbody class='align-middle'></tbody>").appendTo(
    $groupDetailed
  );

  const $headtr = $("<tr></tr>");
  for (const col of ["Date", "Game 1", "Game 2", "Game 3", "Game 4"]) {
    const $th = $(`<th scope="col">${col}</th>`).appendTo($headtr);
    if (col === "Date") $th.addClass("text-start");
  }
  $headtr.appendTo($tablehead);

  for (const row of days) {
    const $tr = $("<tr></tr>").appendTo($tablebody);
    $(`<td><small>${row[0]} ${row[1]}, 2023</small></td>`)
      .addClass("text-start")
      .appendTo($tr);
    for (const item of row.splice(2)) {
      $(
        `<td><small>${item[0]} vs ${item[1]} (${
          category[item[2]]
        })</small></td>`
      ).appendTo($tr);
    }
  }
});

// BASKETBALL STANDING
$(function () {
  for (const [i, category] of Object.entries(["midget", "junior", "senior"])) {
    const $detailed = $("#basketball-standing-tab-pane .standing-detailed");

    const $group = $('<div class="accordion-item"></div>')
      .append("")
      .appendTo($detailed);

    const $accordionHeader = $(
      '<h5 class="accordion-header text-center pt-3 pb-1"></h5>'
    ).appendTo($group);

    const $accordionBody = $(
      `<div id="${category}" class="accordion-collapse collapse${
        category === "midget" ? " show" : ""
      }" data-bs-parent="#basketball-standing">`
    ).appendTo($group);

    $(
      `<button class="accordion-button${
        i == 0 ? "" : " collapsed"
      }" type="button" data-bs-toggle="collapse" data-bs-target="#${category}" aria-expanded="true" aria-controls="${category}">${category.toUpperCase()}</button>`
    ).appendTo($accordionHeader);

    const $groupDetailed = $(
      '<table class="table table-striped table-hover text-center" data-toggle="table" data-custom-sort="numberSort"></table>'
    ).appendTo($accordionBody);

    const $tablehead = $("<thead></thead>").appendTo($groupDetailed);
    const $tablebody = $("<tbody class='align-middle'></tbody>").appendTo(
      $groupDetailed
    );

    const $headtr = $("<tr></tr>");
    for (const col of ["Rank", "Purok", "W", "L", "PCT", "GB", "PF", "PA"]) {
      const $th = $(
        `<th scope="col" data-sortable="true">${col}</th>`
      ).appendTo($headtr);
      if (["PCT", "PF", "PA"].includes(col)) {
        $th.addClass("d-none d-sm-table-cell");
      }
    }
    $headtr.appendTo($tablehead);

    let stats = [];
    for (const [purok, gameResults] of Object.entries(
      basketballStanding[category]
    )) {
      const W = gameResults.filter((x) => x[0] > x[1]).length;
      const L = gameResults.length - W;
      const PCT = (parseInt(W / gameResults.length || 0) * 100).toFixed(1);

      // Points For
      const PF =
        gameResults.reduce((a, b) => a + b[0], 0) / gameResults.length || 0;

      // Points Against

      const PA =
        gameResults.reduce((a, b) => a + b[1], 0) / gameResults.length || 0;

      stats.push([purok, W, L, PCT, undefined, PF, PA]);
    }

    stats = stats.sort((a, b) => b[1] - a[1]);
    stats = stats.map((x) => [
      x[0],
      x[1],
      x[2],
      x[3],
      stats[0][1] - x[1],
      isNaN(x[5]) ? x[5] : x[5].toFixed(1),
      isNaN(x[6]) ? x[6] : x[6].toFixed(1),
    ]);

    for (const [i, row] of Object.entries(stats)) {
      const $tr = $("<tr></tr>").appendTo($tablebody);
      $(`<th scope="row"><small>${parseInt(i) + 1}</small></th>`).appendTo($tr);
      for (const item of row) {
        $(`<td><small>${item}</small></td>`).appendTo($tr);
      }
    }
  }
});

// VOLLEYBALL STANDING
$(function () {
  for (const [i, category] of Object.entries(["men", "women"])) {
    const $detailed = $("#volleyball-standing-tab-pane .standing-detailed");

    const $group = $('<div class="accordion-item"></div>')
      .append("")
      .appendTo($detailed);

    const $accordionHeader = $(
      '<h5 class="accordion-header text-center pt-3 pb-1"></h5>'
    ).appendTo($group);

    const $accordionBody = $(
      `<div id="${category}" class="accordion-collapse collapse${
        i == 0 ? " show" : ""
      }" data-bs-parent="#volleyball-standing">`
    ).appendTo($group);

    $(
      `<button class="accordion-button${
        i == 0 ? "" : " collapsed"
      }" type="button" data-bs-toggle="collapse" data-bs-target="#${category}" aria-expanded="true" aria-controls="${category}">${category.toUpperCase()}</button>`
    ).appendTo($accordionHeader);

    const $groupDetailed = $(
      '<table class="table table-striped table-hover text-center" data-toggle="table" data-custom-sort="numberSort"></table>'
    ).appendTo($accordionBody);

    const $tablehead = $("<thead></thead>").appendTo($groupDetailed);
    const $tablebody = $("<tbody class='align-middle'></tbody>").appendTo(
      $groupDetailed
    );

    const $headtr = $("<tr></tr>");
    for (const col of ["Rank", "Purok", "W", "L", "PCT"]) {
      $(`<th scope="col" data-sortable="true">${col}</th>`).appendTo($headtr);
    }
    $headtr.appendTo($tablehead);

    let stats = [];
    for (const [purok, gameResults] of Object.entries(
      volleyballStanding[category]
    )) {
      const W = gameResults.filter((x) => x[0] > x[1]).length;
      const L = gameResults.length - W;
      const PCT = (parseInt(W / gameResults.length || 0) * 100).toFixed(1);

      stats.push([purok, W, L, PCT]);
    }

    stats = stats.sort((a, b) => b[1] - a[1]);

    for (const [i, row] of Object.entries(stats)) {
      const $tr = $("<tr></tr>").appendTo($tablebody);
      $(`<th scope="row"><small>${parseInt(i) + 1}</small></th>`).appendTo($tr);
      for (const item of row) {
        $(`<td><small>${item}</small></td>`).appendTo($tr);
      }
    }
  }
});

// schedule-featured-card
function sfcard(day, schedules, category, tr) {
  const $card = $('<div class="card text-center"></div>');
  $(`<div class="card-header">${day}</div>`).appendTo($card);

  const $body = $('<div class="card-body"></div>').appendTo($card);

  const $list = $('<div class="list-group list-group-flush"></div>').appendTo(
    $body
  );

  for (const [i, schedule] of Object.entries(schedules)) {
    $('<li class="list-group-item"></li>')
      .append(
        `<strong>Purok ${schedule[0]} vs Purok ${schedule[1]}</strong></br>`
      )
      .append(
        `<small>Game ${parseInt(i) + 1} - ${category[schedule[2]]}</small>`
      )
      .appendTo($list);
  }

  $(`<small class="card-footer text-body-secondary">${tr}</small>`).appendTo(
    $card
  );

  return $card;
}
