class PFL extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Example data
    this._ready = false;
    this._data = {
      baseUrl: "", // Empty string for current directory
      labels: {},
      values: {
        // Peer reviewer data
        pflReviewerCount: "2",
        pflReviewerCountClass: "2.5",
        // Data availability
        pflDataAvailabilityValue: "NA", // Can be "NA", "YES", "NO"
        pflDataAvailabilityValueUrl: "",

        pflDataAvailabilityPercentClass: "40%",

        // Funding data
        pflFundersValue: "YES", // Can be "NA", "YES", "NO"
        pflFundersValueUrl: "#funding-data",
        pflNumHaveFundersClass: "20%",

        // Competing interests
        pflCompetingInterestsValue: "YES", // Can be "NA", "YES", "NO"
        pflCompetingInterestsValueUrl: "#author-list",
        pflCompetingInterestsPercentClass: "25%",

        // Journal statistics
        pflAcceptedPercent: "15%",
        pflNumAcceptedClass: "18%",
        pflDaysToPublication: "180",
        pflDaysToPublicationClass: "240",

        // Index list as array
        pflIndexList: [
          {
            url: "https://doaj.org/toc/1234-5678",
            name: "DOAJ",
            description: "Directory of Open Access Journals",
          },
          {
            url: "https://scholar.google.com",
            name: "Google Scholar",
            description: "Google Scholar Index",
          },
        ],

        // Editorial team URL
        editorialTeamUrl: "/about/editorialTeam",

        // Academic society
        pflAcademicSociety: "Example Academic Society",
        pflAcademicSocietyUrl: "https://example-society.org",

        // Publisher
        pflPublisherName: "Example Publisher",
        pflPublisherUrl: "https://example-publisher.com",
        pflInfoUrl: "https://pkp.sfu.ca/information-on-pfl/",
      },
    };
  }

  set data(value) {
    const newData = Object.assign({}, this._data, value);

    Object.assign(this._data, newData);
    this._ready = true;
    this.render();
  }

  get styles() {
    return `
      <style>
        :host {
          --pfl-base-font-size: 14;
        }

        /* Reset browser defaults (taken from tailwindcss preflight) */
        * {
          margin: 0;
          padding: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-size: inherit;
          font-weight: inherit;
        }

        ol,
        ul,
        menu {
          list-style: none;
        }

        /* GENERAL */
        
        .publication-facts-label {
          font-family: "PFL Noto Sans", "Noto Sans", sans-serif;
          line-height: normal;
          font-optical-sizing: auto;
          font-variation-settings: "wdth" 100;
          font-weight: 350;
          font-size: 14px;
          max-width: 260px;
          color: #000;
          margin-bottom: calc(1.4 * var(--pfl-base-font-size) * 1px);
        }

        /* CONTAINER */
        .publication-facts-label .pfl-container.expanded {
          border-width: 2px;
          border-style: solid;
          border-color: #000000;
          padding-top: 0.2em;
          padding-bottom: calc(0.2 * var(--pfl-base-font-size) * 1px);
          padding-left: calc(0.35 * var(--pfl-base-font-size) * 1px);
          padding-right: calc(0.35 * var(--pfl-base-font-size) * 1px);
          box-shadow: 0 calc(0.1 * var(--pfl-base-font-size) * 1px) calc(0.5 * var(--pfl-base-font-size) * 1px) rgba(0, 0, 0, 0.3);
        }

        /* PFL DROPDOWN BUTTON */
        .pfl-dropdown {
          min-width: calc(16 * var(--pfl-base-font-size) * 1px);
          position: relative;
          border: 1px solid rgba(0, 0, 0, 0.4);
          border-radius: calc(0.2 * var(--pfl-base-font-size) * 1px);
        }

        .pfl-dropdown:hover {
          border-color: #000;
          border: 1px solid rgba(0, 0, 0, 0.6);
          background-color: #00000010;
          cursor: pointer;
          border-radius: calc(0.2 * var(--pfl-base-font-size) * 1px);
        }

        .pfl-dropdown.expanded {
          position: relative;
          height: calc(2.2 * var(--pfl-base-font-size) * 1px);
          min-width: calc(16 * var(--pfl-base-font-size) * 1px);
          border: 1px solid #d0d0d0;
          background-color: #d0d0d0;
          border-radius: calc(0.2 * var(--pfl-base-font-size) * 1px) calc(0.2 * var(--pfl-base-font-size) * 1px) 0 0;
        }

        .publication-facts-label #pfl-button-open-facts {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 850;
          font-size: calc(1.5 * var(--pfl-base-font-size) * 1px);
          white-space: nowrap;
          font-style: normal;
        }

        .publication-facts-label #pfl-button-open-facts[aria-expanded="true"] {
          opacity: 0.5;
        }

        #pfl-buttonText {
          margin-inline-start: calc(0.5 * var(--pfl-base-font-size) * 1px);
        }

        #pfl-button-open-facts img {
          height: calc(0.8 * var(--pfl-base-font-size) * 1px);
          width: calc(0.8 * var(--pfl-base-font-size) * 1px);
          padding-top: calc(0.1 * var(--pfl-base-font-size) * 1px);
          opacity: 0.5;
          margin-left: calc(0.8 * var(--pfl-base-font-size) * 1px);
          margin-right: calc(0.8 * var(--pfl-base-font-size) * 1px);
        }

        /* MAIN CLASSES */
        .publication-facts-label #pfl-title {
          margin-top: 0;
          margin-bottom: 0;
          font-weight: 850;
          font-size: calc(1.9 * var(--pfl-base-font-size) * 1px);
          white-space: nowrap;
          font-style: normal;
        }

        .pfl-header-row {
          border-top: 8px solid black;
          border-bottom: 3px solid #000;
          padding-top: calc(0.18 * var(--pfl-base-font-size) * 1px);
          padding-bottom: calc(0.12 * var(--pfl-base-font-size) * 1px);
          font-size: calc(0.8 * var(--pfl-base-font-size) * 1px);
          font-weight: 500;
          display: flex;
        }

        .pfl-body-row {
          border-bottom: 1px solid #000000;
          font-size: calc(0.9 * var(--pfl-base-font-size) * 1px);
         /* line-height: calc(1.6 * var(--pfl-base-font-size) * 1px);*/
          display: flex;
          align-items: center;
          padding-top: calc(0.15 * var(--pfl-base-font-size) * 1px);
          padding-bottom: calc(0.15 * var(--pfl-base-font-size) * 1px);
        }

        .pfl-this-cell {
          display: inline-block;
          margin-inline-start: calc(0.2 * var(--pfl-base-font-size) * 1px);
          margin-inline-end: calc(2 * var(--pfl-base-font-size) * 1px);
        }

        .pfl-other-cell {
          display: block;
          margin-inline-start: auto;
        }

        .pfl-list-item {
          margin-inline-start: calc(0.2 * var(--pfl-base-font-size) * 1px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pfl-bold {
          font-family: "PFL Noto Sans", "Noto Sans", sans-serif;
          font-weight: 550 !important;
          font-size: calc(1 * var(--pfl-base-font-size) * 1px);
        }

        .publication-facts-label .pfl-indent {
          padding-inline-start: calc(1.2 * var(--pfl-base-font-size) * 1px);
        }

        .publication-facts-label .pfl-body-row li a {
          min-width: 24px;
          min-height: 24px;
          display: inline-block;
          text-align: center;
          line-height: 24px;
        }

        .pfl-body-row ul {
          padding-inline-start: 4px !important;
          display: flex;
        }

        .publication-facts-label #pfl-table-footer {
          border-top: 5px solid black;
          white-space: nowrap;
          padding-top: calc(0.4 * var(--pfl-base-font-size) * 1px);
          display: inline-block;
          width: 100%;
          text-align: center;
        }

        .publication-facts-label #pfl-table-footer p {
          white-space: nowrap;
          font-size: calc(0.75 * var(--pfl-base-font-size) * 1px);
        /*  line-height: calc(1.2 * var(--pfl-base-font-size) * 1px) !important;*/
        }

        /* LISTS */

        li {
          display: inline-block;
        }

        /* PARAGRAPH ELEMENTS */
        p {
          vertical-align: middle;
        }

        /* TABLES */
        .pfl-tables {
          display: none;
        }

        /* INTERACTIVE ELEMENTS */
        a {
          text-decoration: underline;
          color: #006798;
          font-weight: 350 !important;
        }
        a.wrapWithLink {
            text-wrap: nowrap;
        }

        button {
          height: fit-content;
          width: fit-content;
          text-align: start;
          border: none;
          cursor: pointer;
          appearance: none;
          background-color: inherit;
          padding: 0;
          margin: 0;
          color: #000000;
          padding-inline: 0;
          padding-block: 0;
        }

        /* PFL IMG AND ICONS */
        .publication-facts-label #pfl-table-footer .pfl-info-icon {
          max-width: calc(1.25 * var(--pfl-base-font-size) * 1px);
          width: 100%;
          margin-top: calc(-0.5 * var(--pfl-base-font-size) * 1px);
          vertical-align: middle;
        }

        .publication-facts-label .pfl-orcid-icon {
          display: flex;
          align-items: center;
        }

        .pfl-orcid-icon img {
          width: calc(1.2 * var(--pfl-base-font-size) * 1px);
          height: calc(1.2 * var(--pfl-base-font-size) * 1px);
          margin-inline-end: calc(0.2 * var(--pfl-base-font-size) * 1px);
        }

        /* ACCESSIBILITY */
        .pfl-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      </style>
    `;
  }

  render() {
    if (!this._ready) {
      return;
    }
    function html(strings, ...values) {
      return String.raw({ raw: strings }, ...values);
    }

    this.shadowRoot.innerHTML = html`
      ${this.styles}
      <div class="publication-facts-label">
        <div class="pfl-dropdown">
          <button
            id="pfl-button-open-facts"
            aria-controls="pfl-fact-table"
            aria-expanded="false"
          >
            <span
              ><span
                id="pfl-buttonText"
                data-label="publicationFacts"
              ></span></span
            ><img data-src="pfl-down-arrow.svg" aria-hidden="true" />
          </button>
        </div>

        <div id="pfl-container" class="pfl-container">
          <div id="pfl-fact-table" class="pfl-tables" role="region">
            <h2 id="pfl-title" data-label="publicationFacts"></h2>

            <div role="table">
              <div role="row" class="pfl-header-row">
                <div role="columnheader" class="pfl-sr-only">
                  <span data-label="metric"></span>
                </div>
                <div
                  role="columnheader"
                  class="pfl-this-cell"
                  data-label="thisArticle"
                ></div>
                <div
                  role="columnheader"
                  class="pfl-other-cell"
                  data-label="otherArticles"
                ></div>
              </div>
              <div role="row" class="pfl-body-row">
                <div role="rowheader" class="pfl-bold">
                  <span data-label="peerReviewers"></span>&nbsp;
                </div>
                <div
                  role="cell"
                  class="pfl-this-cell pfl-bold"
                  data-value="pflReviewerCount"
                ></div>
                <div
                  role="cell"
                  class="pfl-other-cell"
                  data-value="pflReviewerCountClass"
                ></div>
              </div>
            </div>

            <h3 class="pfl-body-row">
              <div
                class="pfl-this-cell pfl-bold"
                data-label="authorStatements"
              ></div>
            </h3>

            <div role="table">
              <div role="row" class="pfl-header-row pfl-sr-only">
                <div role="columnheader">
                  <span data-label="authorStatements"></span>
                </div>
                <div role="columnheader" data-label="thisArticle"></div>
                <div role="columnheader" data-label="otherArticles"></div>
              </div>
              <div role="row" class="pfl-body-row">
                <div role="rowheader" class="pfl-indent">
                  <span data-label="dataAvailability"></span>&nbsp;
                </div>
                <div role="cell" class="pfl-this-cell">
                  <span
                    data-value="pflDataAvailabilityValue"
                    data-wrap-link="pflDataAvailabilityValueUrl"
                    data-hash="data-availability"
                  ></span>
                </div>
                <div
                  role="cell"
                  class="pfl-other-cell"
                  data-value="pflDataAvailabilityPercentClass"
                ></div>
              </div>
              <div role="row" class="pfl-body-row">
                <div role="rowheader" class="pfl-indent">
                  <span data-label="externalFunding"></span>&nbsp;
                </div>
                <div role="cell" class="pfl-this-cell">
                  <span
                    data-value="pflFundersValue"
                    data-wrap-link="pflFundersValueUrl"
                    data-hash="funding"
                  ></span>
                </div>
                <div
                  role="cell"
                  class="pfl-other-cell"
                  data-value="pflNumHaveFundersClass"
                ></div>
              </div>
              <div role="row" class="pfl-body-row">
                <div role="rowheader" class="pfl-indent">
                  <span data-label="competingInterests"></span>&nbsp;
                </div>
                <div role="cell" class="pfl-this-cell">
                  <span
                    data-value="pflCompetingInterestsValue"
                    data-wrap-link="pflCompetingInterestsValueUrl"
                    data-hash="competing-interests"
                  ></span>
                </div>
                <div
                  role="cell"
                  class="pfl-other-cell"
                  data-value="pflCompetingInterestsPercentClass"
                ></div>
              </div>
            </div>

            <div role="table">
              <div role="row" class="pfl-header-row">
                <div role="columnheader" class="pfl-sr-only">
                  <span data-label="metric"></span>
                </div>
                <div
                  role="columnheader"
                  class="pfl-this-cell"
                  data-label="forThisJournal"
                ></div>
                <div
                  role="columnheader"
                  class="pfl-other-cell"
                  data-label="otherJournals"
                ></div>
              </div>

              <div role="row" class="pfl-body-row">
                <div role="rowheader" class="pfl-bold">
                  <span data-label="articlesAccepted"></span>&nbsp;
                </div>
                <div
                  role="cell"
                  class="pfl-this-cell pfl-bold"
                  data-value="pflAcceptedPercent"
                  data-hash="articles-accepted"
                ></div>
                <div
                  role="cell"
                  class="pfl-other-cell"
                  data-value="pflNumAcceptedClass"
                ></div>
              </div>

              <div role="row" class="pfl-body-row">
                <div role="rowheader" class="pfl-indent">
                  <span data-label="daysToPublication"></span>&nbsp;
                </div>
                <div
                  role="cell"
                  class="pfl-this-cell"
                  data-value="pflDaysToPublication"
                  data-hash="days-to-publication"
                ></div>
                <div
                  role="cell"
                  class="pfl-other-cell"
                  data-value="pflDaysToPublicationClass"
                ></div>
              </div>
            </div>

            <div class="pfl-body-row">
              <h3
                id="pfl-heading-indexed-in"
                class="pfl-bold"
                data-label="indexedIn"
              ></h3>
              <ul
                class="pfl-list-item"
                aria-labelledby="pfl-heading-indexed-in"
                role="list"
                data-list="pflIndexList"
              ></ul>
            </div>

            <dl>
              <div class="pfl-body-row pfl-orcid-icon">
                <dt class="pfl-bold" data-label-html="editorAndBoard"></dt>
              </div>

              <div class="pfl-body-row" data-show="pflAcademicSociety">
                <dt class="pfl-indent">
                  <span data-label="academicSociety"></span>&nbsp;
                </dt>
                <dd class="pfl-list-item">
                  <span
                    data-value="pflAcademicSociety"
                    data-wrap-link="pflAcademicSocietyUrl"
                    data-hash="society"
                  ></span>
                </dd>
              </div>

              <div class="pfl-body-row" data-show="pflPublisherName">
                <dt class="pfl-indent">
                  <span data-label="publisher"></span>&nbsp;
                </dt>
                <dd class="pfl-list-item" data-publisher="true">
                  <span
                    title="pflPublisherName"
                    data-value="pflPublisherName"
                    data-wrap-link="pflPublisherUrl"
                    data-hash="publisher"
                  ></span>
                </dd>
              </div>
            </dl>

            <div id="pfl-table-footer">
              <p>
                <span data-label="informationFooter"></span>
                <img
                  class="pfl-info-icon"
                  data-src="info_icon.svg"
                  data-alt="informationIcon"
                  data-wrap-link="pflInfoUrl"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const shadowRoot = this.shadowRoot;

    function wrapWithLink(element, url, hash = null) {
      if (url) {
        const a = document.createElement("a");
        a.setAttribute('class', 'wrapWithLink');

        if (!url.includes("#")) {
          a.target = "_blank";
        }

        if (hash) {
          a.href = url + "#" + hash;
        } else {
          a.href = url;
        }

        a.rel = "noopener noreferrer";

        element.parentNode.insertBefore(a, element);
        a.appendChild(element);
      }
    }

    // Render labels
    for (const [key, value] of Object.entries(this._data.labels)) {
      shadowRoot.querySelectorAll(`[data-label="${key}"]`).forEach((el) => {
        if (typeof value === "string") {
          el.textContent = value;
        }
      });
      shadowRoot.querySelectorAll(`[data-label-html="${key}"]`).forEach((el) => {
        if (typeof value === "string") {
          el.innerHTML = value;
        }
      });
    }

    // Render values
    shadowRoot.querySelectorAll("[data-value]").forEach((e) => {
      const valueKey = e.getAttribute("data-value");
      const attributeName = e.getAttribute("data-attribute");
      const value = this._data.values[valueKey];
      const valueTranslated = this.translatePlaceholders(value);
      // null or undefined
      if (valueTranslated != null) {
        if (attributeName != null) {
            // If an attribute name was specified using `data-attribute`, set it...
            e.setAttribute(attributeName, valueTranslated);
        } else {
            // ...otherwise set the node value.
            e.textContent = valueTranslated;
        }
        e.setAttribute("title", valueTranslated);
        // wrap for N/A links to the docs
        if (value === "NA") {
          const hashValue = e.getAttribute("data-hash");

          wrapWithLink(e, this._data.values.pflInfoUrl, hashValue);
        }
      }
    });

    // Handle images
    shadowRoot.querySelectorAll("[data-src]").forEach((img) => {
      const src = img.getAttribute("data-src");
      const basePath = this._data.baseUrl ? `${this._data.baseUrl}/` : "";
      img.src = `${basePath}img/${src}`;
    });

    // Handle alt text for images
    shadowRoot.querySelectorAll("[data-alt]").forEach((img) => {
      const altKey = img.getAttribute("data-alt");
      if (this._data.labels[altKey]) {
        img.alt = this._data.labels[altKey];
      }
    });

    // Handle wrapping in the link if link available
    shadowRoot.querySelectorAll("[data-wrap-link]").forEach((element) => {
      const hrefKey = element.getAttribute("data-wrap-link");
      if (this._data.values[hrefKey]) {
        wrapWithLink(element, this._data.values[hrefKey]);
      }
    });

    // Handle index list
    const indexList = shadowRoot.querySelector('[data-list="pflIndexList"]');

    const items = this._data.values.pflIndexList;

    if (items.length > 0) {
      const frag = document.createDocumentFragment();

      items.forEach((item) => {
        const href = String(item.url).trim();

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-description", item.description);

        a.textContent = item.name; // auto-escaped

        li.appendChild(a);
        frag.appendChild(li);
      });

      indexList.appendChild(frag);
    } else {
      const li = document.createElement("li");
      li.innerHTML = "&mdash;";
      indexList.appendChild(li);
    }

    // Handle conditional visibility
    shadowRoot.querySelectorAll("[data-show]").forEach((el) => {
      const showKey = el.getAttribute("data-show");
      if (!this._data.values[showKey]) {
        el.style.display = "none";
      }
    });

    // Add event listener for dropdown toggle
    const toggleButton = this.shadowRoot.getElementById(
      "pfl-button-open-facts"
    );
    if (toggleButton) {
      toggleButton.addEventListener("click", () => this.toggleFactsLabel());
    }
  }

  toggleFactsLabel() {
    const shadowRoot = this.shadowRoot;
    const toggleButton = shadowRoot.getElementById("pfl-button-open-facts");
    const pflFactTable = shadowRoot.getElementById("pfl-fact-table");
    const pflContainer = shadowRoot.getElementById("pfl-container");
    const highlightDropdown = shadowRoot.querySelector(".pfl-dropdown");
    const placeHolderText = shadowRoot.getElementById("pfl-buttonText");

    if (
      !toggleButton ||
      !pflFactTable ||
      !pflContainer ||
      !highlightDropdown ||
      !placeHolderText
    ) {
      console.error("One or more required elements are missing.");
      return;
    }

    const ariaExpandedAttr = toggleButton.getAttribute("aria-expanded");

    if (ariaExpandedAttr === "false") {
      toggleButton.setAttribute("aria-expanded", "true");
      pflContainer.classList.add("expanded");
      highlightDropdown.classList.add("expanded");
      placeHolderText.classList.add("pfl-sr-only");
      pflFactTable.style.display = "block";
    } else {
      toggleButton.setAttribute("aria-expanded", "false");
      pflContainer.classList.remove("expanded");
      highlightDropdown.classList.remove("expanded");
      placeHolderText.classList.remove("pfl-sr-only");
      pflFactTable.style.display = "none";
    }
  }

  connectedCallback() {
    this.render();
  }

  translatePlaceholders(value) {
    if (value === "NA") {
      return this._data.labels.notAvailable;
    } else if (value === "YES") {
      return this._data.labels.yes;
    } else if (value === "NO") {
      return this._data.labels.no;
    }

    return value;
  }
}

if (!customElements.get("publication-facts-label")) {
  customElements.define("publication-facts-label", PFL);
}
