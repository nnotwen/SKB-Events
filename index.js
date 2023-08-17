const schedules = {
  basketball: {
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
      ["August", 16, [5, "2B", 0], [5, "2A", 2], [3, "2A", 1]],
      ["August", 18, ["6B", 4, 0], [4, 7, 2], [6, 7, 1]],
    ],
  },
  volleyball: {
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
      ["August", 10, ["6B", 3, 1], [1, 4, 1], [6, 7, 0]],
      ["August", 17, [7, "6A", 1], [3, 2, 1], [6, 4, 0], [2, 3, 0]],
      ["August", 19, ["6A", 1, 1], [4, "6B", 1], [5, 1, 0], [4, 7, 0]],
      ["August", 22, [1, 2, 1], [7, 3, 1], [1, 2, 0], [3, 6, 0]],
      ["August", 24, ["6A", 4, 1], [2, "6B", 1], [2, 7, 0], [5, 4, 0]],
      ["August", 29, [4, 7, 1], [3, 1, 1], [1, 3, 0], [4, 2, 0]],
      ["August", 31, [7, "6B", 1], ["6A", 2, 1], [3, 5, 0], [1, 7, 0]],
    ],
  },
};

const standings = {
  basketball: {
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
  },
  volleyball: {
    men: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [[1, 0]],
      7: [[0, 1]],
    },
    women: {
      1: [[1, 0]],
      2: [],
      3: [[1, 0]],
      4: [[0, 1]],
      "6A": [],
      "6B": [[0, 1]],
      7: [],
    },
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

const rules = [
  {
    subheading: "Tournament Committee Decisions",
    content:
      "All final decisions regarding grievances, such as protests and eligibility, are made by the tournament committee.",
  },
  {
    subheading: "Entrance Fee",
    content: "There is no entrance fee required.",
  },
  {
    subheading: "Roster Submission",
    content:
      "Teams must submit their rosters to the tournament committee before the final tournament briefing. No changes can be made after this briefing.",
  },
  {
    subheading: "Protests and Concerns",
    content:
      "Protests or concerns will only be addressed on the day of the briefing.",
  },
  {
    subheading: "Player Eligibility and Forfeits",
    content:
      "Using ineligible players not listed on the roster will result in a forfeit. The team manager is responsible for ensuring all players are eligible and have signed the roster.",
  },
  {
    subheading: "Property Damage",
    content:
      "Intentional property damage will lead to penalties, including payment for damages and automatic suspension from the next game.",
  },
  {
    subheading: "Accidental Damage",
    content: "Exemptions may apply for accidental damage during the game.",
  },
  {
    subheading: "Playing for One Team Only",
    content:
      "Players cannot play for more than one team during the tournament. Violating this rule leads to forfeits for relevant games and associated teams.",
  },
  {
    subheading: "Team Conduct",
    content:
      "Team captains/managers are responsible for their team’s behavior. Those under the influence of substances can be expelled from games and tournaments.",
  },
  {
    subheading: "Fiba Rules",
    content: "All Fiba Rules are applicable.",
  },
  {
    subheading: "Timeliness",
    content:
      "Teams must be on time for games, as game time is forfeit time. A ten-minute grace period will be given.",
  },
  {
    subheading: "Bracket Times and Forfeits",
    content:
      "Estimated times are provided on the bracket. Teams should be present one hour before their game to avoid forfeits.",
  },
  {
    subheading: "Fighting and Ejections",
    content:
      "Fighting, on or off the court, leads to ejection from the game and gymnasium, along with a suspension for the next game.",
  },
  {
    subheading: "Parental Consent",
    content:
      "Players under 18 must have a parent or guardian sign the release form.",
  },
  {
    subheading: "Game Fixing",
    content:
      "If game fixing is detected between teams, the involved teams will be forfeited from the tournament.",
  },
];

// RULES MODAL
$(function () {
  const $modal = $("#rules").addClass("fade modal-lg").attr({
    tabindex: -1,
    "data-bs-backdrop": "static",
    "data-bs-keyboard": false,
    "aria-labelledby": "rulesModalLabel",
    "aria-hidden": true,
  });

  const $dialogue = $("<div></div>")
    .addClass("modal-dialog modal-dialog-centered")
    .appendTo($modal);

  const $content = $("<div></div>")
    .addClass("modal-content")
    .appendTo($dialogue);

  const $header = $("<div></div>").addClass("modal-header").appendTo($content);
  const $body = $("<div></div>").addClass("modal-body").appendTo($content);
  const $footer = $("<div></div>").addClass("modal-footer").appendTo($content);

  $("<div></div>")
    .addClass("modal-title fs-5")
    .attr("id", "modalRulesLabel")
    .appendTo($header)
    .append($('<i class="bi-file-check-fill me-2"></i>'))
    .append("Rules");

  $("<button></button>")
    .addClass("btn btn-close")
    .attr({ "data-bs-dismiss": "modal", "aria-label": "Close" })
    .appendTo($header);

  $("<button></button>")
    .attr({
      type: "button",
      "data-bs-dismiss": "modal",
    })
    .addClass("btn btn-secondary")
    .html("Close")
    .appendTo($footer);

  const $ol = $("<ol></ol>")
    .addClass("list-group list-group-flush list-group-numbered")
    .appendTo($body);

  for (const rule of rules) {
    const $li = $("<li></li>")
      .appendTo($ol)
      .addClass(
        "list-group-item d-flex justify-content-between align-items-start"
      );

    const $subheading = $("<div></div>")
      .html(rule.subheading)
      .addClass("fw-bold");

    const $content = $("<p></p>")
      .html(rule.content)
      .addClass("text-secondary-emphasis");

    $("<div></div>")
      .addClass("ms-2 me-auto")
      .appendTo($li)
      .append($subheading)
      .append($content);
  }
});

// LIGHT/DARK MODE TOGGLE + PERSISTENCY
$(function () {
  function changeTheme(mode) {
    const icon = {
      light: "bi-brightness-high-fill",
      dark: "bi-moon-stars-fill",
    };

    $("#theme-toggle .dropdown-item").each(function () {
      const $checkIcon = $(this).children(".bi-check-lg");
      if (mode == $(this).attr("data-bs-theme-value")) {
        $(this).addClass("active");
        $checkIcon.removeClass("d-none");
      } else {
        $(this).removeClass("active");
        $checkIcon.addClass("d-none");
      }
    });

    $("html").attr("data-bs-theme", mode);
    $("#theme-toggle .dropdown-toggle i").attr("class", `${icon[mode]} me-2`);
  }

  changeTheme(localStorage.getItem("bs-theme") || "dark");

  $("#theme-toggle .dropdown-item").on("click", function () {
    const mode = $(this).attr("data-bs-theme-value");
    localStorage.setItem("bs-theme", mode);

    changeTheme(mode);
  });
});

moment.updateLocale("en", {
  invalidDate: "--",
});

// #SCHEDULE
$(function () {
  for (const type of Object.keys(schedules)) {
    const $summary = $(`#${type}-schedule-tab-pane .schedule-summary`);
    const $detailed = $(`#${type}-schedule-tab-pane .schedule-detailed`);

    const $groupSummary = $("<div></div>")
      .addClass("card-group")
      .appendTo($summary);

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
    const $td = $("<form></form>")
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

    $("<label></label>")
      .html("Display concluded games")
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

// #STANDING
$(function () {
  for (const type of Object.keys(standings)) {
    for (const [i, category] of Object.keys(standings[type]).entries()) {
      const $detailed = $(`#${type}-standing-tab-pane .standing-detailed`);

      const $item = $("<div></div>")
        .addClass("accordion-item")
        .appendTo($detailed);

      const $aheader = $("<h5></h5>")
        .addClass("accordion-header text-center pt-3 pb-1")
        .appendTo($item);

      const $abody = $("<div></div>")
        .attr({ id: category, "data-bs-parent": `#${type}-standing` })
        .addClass("accordion-collapse collapse show")
        .appendTo($item);

      const $abtn = $("<button></button>")
        .addClass("accordion-button")
        .html(category.toUpperCase())
        .appendTo($aheader)
        .attr({
          type: "button",
          "data-bs-toggle": "collapse",
          "data-bs-target": `#${category}`,
          "aria-expanded": true,
          "aria-controls": category,
        });

      if (i != 0) {
        $abtn.addClass("collapsed");
        $abody.removeClass("show");
      }

      const $groupDetailed = $("<table></table>")
        .addClass("table table-striped table-hover text-center")
        .appendTo($abody)
        .attr({
          "data-toggle": "table",
          "data-custom-sort": "numberSort",
        });

      const $thead = $("<thead></thead>").appendTo($groupDetailed);
      const $tbody = $("<tbody></tbody>")
        .addClass("align-middle")
        .appendTo($groupDetailed);

      const $headtr = $("<tr></tr>").appendTo($thead);
      class Stats {
        constructor(data = []) {
          this.W = data.filter((x) => x[0] > x[1]).length;
          this.L = data.filter((x) => x[1] > x[0]).length;
          this.PCT = (parseInt(this.W / data.length || 0) * 100).toFixed(1);
          this.GB = null;
          this.PF = data.reduce((a, b) => a + b[0], 0) / data.length || 0;
          this.PA = data.reduce((a, b) => a + b[1], 0) / data.length || 0;
          this.DIFF = this.PF - this.PA;

          if (this.DIFF > 0) this.DIFF = "+" + this.DIFF;

          this.PF = this.PF.toFixed(1);
          this.PA = this.PA.toFixed(1);
        }

        values() {
          return Object.values(this);
        }
      }

      for (const col of ["Rank", "Purok", ...Object.keys(new Stats())]) {
        if (type == "volleyball" && ["PF", "PA", "DIFF"].includes(col)) {
          continue;
        }
        const $th = $("<th></th>")
          .html(col)
          .appendTo($headtr)
          .attr({ scope: "col", "data-sortable": true });

        if (["PCT", "PF", "PA", "DIFF"].includes(col)) {
          $th.addClass("d-none d-sm-table-cell");
        }

        if (htmlTitle[col]) {
          $th.attr("title", htmlTitle[col]);
        }
      }

      const stats = Object.entries(standings[type][category])
        .map(([p, data]) => [p, ...new Stats(data).values()])
        .sort((a, b) => a[2] - b[2])
        .sort((a, b) => b[1] - a[1]);

      for (const [i, row] of Object.entries(stats)) {
        const $tr = $("<tr></tr>").appendTo($tbody);
        const $th = $("<th></th>").appendTo($tr);
        let rank = parseInt(i) + 1;

        if (i == 0) {
          rank = $("<i></i>").addClass("bi-trophy-fill text-warning");
        } else {
          rank = parseInt(i) + 1;
        }

        $("<small></small>").html(rank).appendTo($th);

        if (type == "volleyball") {
          row.splice(5, 3);
        }

        for (const [i, item] of row.entries()) {
          const $td = $("<td></td>").appendTo($tr);

          if (i == 4) {
            $("<small></small>")
              .html(stats[0][1] - row[1])
              .appendTo($td);
          } else {
            $("<small></small>").html(item).appendTo($td);
          }
        }
      }
    }
  }
});

// schedule-featured-card

function sfcard(day, schedules, category, tr) {
  const $card = $("<div></div>").addClass("card text-center");
  $("<div></div>").addClass("card-header").html(day).appendTo($card);

  const $body = $("<div></div>").addClass("card-body").appendTo($card);
  const $list = $("<div></div>")
    .addClass("list-group list-group-flush")
    .appendTo($body);

  for (const [i, schedule] of Object.entries(schedules)) {
    const $item = $("<li></li>").addClass("list-group-item").appendTo($list);

    $("<strong></strong>")
      .html(`Purok ${schedule[0]} vs Purok ${schedule[1]}`)
      .appendTo($item);

    $("</br>").appendTo($item);

    $("<small></small>")
      .html(`Game ${parseInt(i) + 1} - ${category[schedule[2]]}`)
      .appendTo($item);
  }

  if (!schedules.length) {
    $("<i></i>")
      .addClass("bi-calendar2-x text-secondary")
      .css("font-size", "6.5rem")
      .appendTo($list);
  }

  $("<small></small>")
    .addClass("card-footer text-body-secondary")
    .html(tr)
    .appendTo($card);

  return $card;
}
