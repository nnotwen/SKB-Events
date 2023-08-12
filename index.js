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
    ["August", 5, ["2B", "6B", 0], [3, 6, 1], ["2A", 4, 2]],
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

const htmlTitle = {
  W: "Won",
  L: "Lost",
  PCT: "Win Percentage",
  GB: "Games Behind",
  PF: "Points For",
  PA: "Points Against",
  DIFF: "Difference (PF:PA)",
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

// #SCHEDULE
$(function () {
  for (const type of ["basketball", "volleyball"]) {
    const $summary = $(`#${type}-schedule-tab-pane .schedule-summary`);
    const $detailed = $(`#${type}-schedule-tab-pane .schedule-detailed`);

    const $groupSummary = $("<div></div>")
      .addClass("card-group")
      .appendTo($summary);

    const schedules = {
      basketball: {
        month: basketballSchedule.month,
        days: basketballSchedule.days,
        category: basketballSchedule.category,
      },
      volleyball: {
        month: volleyballSchedule.month,
        days: volleyballSchedule.days,
        category: volleyballSchedule.category,
      },
    };

    const months = schedules[type].month;
    const days = schedules[type].days;
    const category = schedules[type].category;

    const month = new Date().getMonth();
    const day = new Date().getDate();

    let index = days.findIndex(function (x) {
      const $1 = x[0] === months[month] && x[1] >= day;
      const $2 = x[0] === months[month + 1];
      return $1 || $2;
    });

    if (index == -1) index = days.length;

    for (const i of [index - 1, index, index + 1]) {
      const $$h = days[i] ? `${days[i][0]} ${days[i][1]}, 2023` : "No Schedule";
      const $$d = days[i] ? days[i].slice(2) : [];
      const $$f = moment(new Date($$h)).add(18.5, "hours").calendar();

      const $card = sfcard($$h, $$d, category, $$f);

      if (i !== index) {
        $card.addClass("d-none d-sm-flex");
      }

      $groupSummary.append($card);
    }

    // Start of .schedule-detailed
    const $td = $("<div></div>")
      .addClass("form-check form-switch")
      .appendTo($detailed);

    $("<input>")
      .addClass("form-check-input")
      .appendTo($td)
      .attr({
        type: "checkbox",
        role: "switch",
        id: `${type}-schedule-display-toggle`,
      });

    $("<label>Show finished matches</label>")
      .addClass("form-check-label")
      .appendTo($td)
      .attr({
        for: `${type}-schedule-display-toggle`,
      });

    const $groupDetailed = $("<table></table>")
      .addClass("table table-striped table-hover text-center")
      .appendTo($detailed);

    const $thead = $("<thead></thead>").appendTo($groupDetailed);
    const $tbody = $("<tbody></tbody>")
      .addClass("align-middle")
      .appendTo($groupDetailed);

    const $headtr = $("<tr></tr>").appendTo($thead);
    const tableHeaders = {
      basketball: ["Date", "Game 1", "Game 2", "Game 3"],
      volleyball: ["Date", "Game 1", "Game 2", "Game 3", "Game 4"],
    };

    for (const col of tableHeaders[type]) {
      const $th = $(`<th>${col}</th>`).attr("scope", "col").appendTo($headtr);

      if (col === "Date") $th.addClass("text-start");
    }

    for (const [i, row] of Object.entries(days)) {
      const $tr = $("<tr></tr>").appendTo($tbody);

      if (i < index) $tr.addClass("row-disabled d-none");

      if (i == index)
        $tr.addClass(
          "border border-2 border-start-0 border-end-0 border-info row-emphasis"
        );

      $(`<td><small>${row[0]} ${row[1]}, 2023</small></td>`)
        .addClass("text-start")
        .appendTo($tr);

      for (const item of row.splice(2)) {
        const $L1 = $("<span></span>").html(`${item[0]} vs ${item[1]}`);
        const $L2 = $("<span></span>");

        const $L2btn = $("<button></button>")
          .html(category[item[2]])
          .addClass("btn btn-sm tags rounded-pill")
          .addClass(i == index ? "btn-info" : "btn-secondary")
          .appendTo($L2);

        if (i < index) {
          $L2btn.addClass("disabled");
        }

        $("<td></td>").append($L1).append("</br>").append($L2).appendTo($tr);
      }
    }

    if ($tbody.find("tr.row-disabled").length == days.length) {
      $("<caption></caption>")
        .html("No more upcoming match.")
        .addClass("text-center")
        .appendTo($groupDetailed);
    }
  }
});

// HIDE/SHOW FINISHED DATES TOGGLE FOR SCHEDULE
$(function () {
  $(".schedule-detailed .form-switch").on("click", function () {
    const $input = $(this).find(".form-check-input");
    const checked = $input.is(":checked");
    const id = $input.attr("id");

    $(`#${id.split("-")[0]}-schedule-tab-pane`)
      .find(".table tbody tr")
      .filter((_i, tr) => $(tr).hasClass("row-disabled"))
      .each((_i, tr) => {
        $(tr)[checked ? "removeClass" : "addClass"]("d-none");
      });
  });
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
    for (const col of [
      "Rank",
      "Purok",
      "W",
      "L",
      "PCT",
      "GB",
      "PF",
      "PA",
      "DIFF",
    ]) {
      const $th = $(`<th scope="col" data-sortable="true">${col}</th>`)
        .attr("title", htmlTitle[col])
        .appendTo($headtr);
      if (["PCT", "PF", "PA", "DIFF"].includes(col)) {
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

      stats.push([purok, W, L, PCT, undefined, PF, PA, PF - PA]);
    }

    stats = stats.sort((a, b) => a[2] - b[2]);
    stats = stats.sort((a, b) => b[1] - a[1]);
    stats = stats.map((x) => [
      x[0],
      x[1],
      x[2],
      x[3],
      stats[0][1] - x[1],
      isNaN(x[5]) ? x[5] : x[5].toFixed(1),
      isNaN(x[6]) ? x[6] : x[6].toFixed(1),
      x[7] > 0 ? `+${x[7]}` : x[7],
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

  if (!schedules.length) {
    $('<i class="bi-calendar2-x text-secondary"></i>')
      .css("font-size", "6.5rem")
      .appendTo($list);
  }

  $(`<small class="card-footer text-body-secondary">${tr}</small>`).appendTo(
    $card
  );

  return $card;
}
