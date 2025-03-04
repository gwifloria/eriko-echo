/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  FilterKind: () => FilterKind,
  default: () => AutomationPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/settings/suggester/genericTextSuggester.ts
var import_obsidian = require("obsidian");
var CommandSuggester = class extends import_obsidian.AbstractInputSuggest {
  constructor(app, inputEl, items) {
    super(app, inputEl);
    this.app = app;
    this.inputEl = inputEl;
    this.items = items;
  }
  getSuggestions(inputStr) {
    const inputLowerCase = inputStr.toLowerCase();
    const filtered = this.items.filter((item) => {
      if (item.toLowerCase().contains(inputLowerCase))
        return item;
    });
    if (!filtered)
      this.close();
    return filtered;
  }
  renderSuggestion(value, el) {
    if (value)
      el.setText(value);
  }
  selectSuggestion(item) {
    this.textInputEl.value = item;
    this.textInputEl.trigger("input");
    this.close();
  }
};

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/types/Command.ts
var Command = class {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.id = v4_default();
  }
};

// src/types/ObsidianCommand.ts
var ObsidianCommand = class extends Command {
  constructor(name, commandId) {
    super(name, "Obsidian" /* Obsidian */);
    this.generateId = () => this.id = v4_default();
    this.commandId = commandId;
  }
};

// src/util.ts
var import_obsidian2 = require("obsidian");
function getTimeRemaining(givenTime) {
  const targetTime = hourString2time(givenTime);
  if (targetTime == null) {
    let msg = `Invalid time string "When"`;
    new import_obsidian2.Notice(msg);
    console.error(msg);
    return null;
  }
  if (targetTime < new Date()) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  const currentTime = new Date();
  const remainingTime = targetTime.getTime() - currentTime.getTime();
  return remainingTime;
}
function hourString2time(str) {
  if (/\d{1,2}:\d{1,2}/.test(str)) {
    const [hours, minutes] = str.split(":").map(Number);
    if (!(hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60)) {
      let msg = `Invalid time string: ${str}`;
      return null;
    }
    const targetTime = new Date();
    targetTime.setHours(hours);
    targetTime.setMinutes(minutes);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);
    return targetTime;
  } else {
    return null;
  }
}
function fromStringCode(code) {
  try {
    if (!checkStringCode(code)) {
      let msg = `Invalid string code: ${code}`;
      new import_obsidian2.Notice(msg);
      console.error(msg);
      return null;
    }
    const wrapping_fn = window.eval(
      `(function anonymous(){return ${code};
})`
    );
    const res = wrapping_fn();
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
}
function checkStringCode(code) {
  if (code.match(/[^a-zA-Z](return|window|setTimeout|setInterval)[^a-zA-Z0-9]/)) {
    return false;
  }
  return true;
}
function ensureString2list(properties) {
  if (properties === null || properties === void 0) {
    return [];
  } else if (typeof properties === "string") {
    return properties.replace(/\n|^\s*,|,\s*$/g, "").replace(/,,+/g, ",").split(",").map((p) => p.trim());
  } else {
    return properties;
  }
}

// src/settings/suggester/util.ts
function genFilterDesc(Action) {
  const filter = Action.filters[0];
  switch (filter.kind) {
    case "none" /* none */:
      return ``;
    case "file path in Obsidian" /* filePath */:
      console.log(filter);
      if (filter.modeCode) {
        return `File path (now): ` + fromStringCode(filter.pattern);
      } else {
        return `File path: ` + filter.pattern;
      }
      break;
    case "tags" /* tags */:
      return `Tags (separated by comma)`;
      return `Tags (separated by comma): ` + filter.pattern;
      return filter.pattern;
  }
}

// main.ts
var FilterKind = /* @__PURE__ */ ((FilterKind2) => {
  FilterKind2["none"] = "none";
  FilterKind2["filePath"] = "file path in Obsidian";
  FilterKind2["tags"] = "tags";
  return FilterKind2;
})(FilterKind || {});
var DefaultActionSettings = {
  id: "default-id",
  type: "event" /* event */,
  enabled: true,
  commands: [],
  filters: [{
    kind: "none" /* none */,
    pattern: "",
    modeRegExp: true,
    modeCode: false
  }],
  eventSetting: {
    type: "file-open" /* fileOpen */
  },
  timerSetting: {
    // interval: 0,
    type: "every day" /* everyDay */,
    when: [{
      HM: ""
    }]
  },
  name: "demo"
};
function newDefaultActionSettings() {
  return JSON.parse(JSON.stringify(DefaultActionSettings));
}
var DEFAULT_SETTINGS = {
  actions: [newDefaultActionSettings()],
  debug: {
    console: false,
    writeLog: false
  }
};
var AutomationPlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.eventList = ["file-open", "active-leaf-change"];
    this.debounceUpdateAutomation = (0, import_obsidian3.debounce)(this.updateAutomation, 1e3, true);
    this.timerLog = [];
    this.timerSet = /* @__PURE__ */ new Set();
    // set of actionSetting.id
    this.timeoutIdSet = /* @__PURE__ */ new Set();
    // id from `window.setTimeout()`
    this.logs = [];
  }
  setTimer(actionId) {
    const Action = this.settings.actions.find((e) => e.id == actionId);
    if (Action == null || Action.type !== "timeout" /* timeout */ || !Action.enabled) {
      return;
    }
    const remainTime = getTimeRemaining(Action.timerSetting.when[0].HM);
    if (remainTime == null) {
      return;
    }
    if (Action.commands.length == 0) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      for (let command of Action.commands) {
        if (command) {
          let r = this.app.commands.executeCommandById(command.commandId);
          this.log(`Run command:`, command);
        }
      }
      this.setTimer(actionId);
    }, remainTime);
    this.log(`Set timeout for ${actionId} when ${window.moment(new Date()).format("HH:mm")}, ${Math.ceil(remainTime / 1e3 / 60)} min to run.`);
    this.timerSet.add(actionId);
    this.timeoutIdSet.add(timeoutId);
    this.timerLog.push({
      id: actionId,
      action: Action,
      now: new Date(),
      remainTime
    });
    this.checkTimerStatus();
  }
  checkTimerStatus() {
    this.log("Timer Log");
    this.log(this.timerLog);
  }
  test() {
    var _a;
    const file = this.app.workspace.getActiveFile();
    this.log(file);
    const frontmatter = (_a = this.app.metadataCache.getCache(file == null ? void 0 : file.path)) == null ? void 0 : _a.frontmatter;
    this.log(frontmatter);
  }
  async onload() {
    await this.loadSettings();
    this.eventRefList = [];
    this.logFilePath = (0, import_obsidian3.normalizePath)(this.manifest.dir + `/log-${window.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}.log`);
    this.addSettingTab(new AutomationSettingTab(this.app, this));
    this.debounceUpdateAutomation();
    for (let mode of ["source", "preview"]) {
      this.addCommand({
        id: `ensure-${mode}-mode`,
        name: `Ensure ${mode} mode`,
        callback: () => {
          const activeLeaf = this.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
          let e = activeLeaf.leaf;
          let t = e.getViewState();
          t.state.mode = mode;
          e.setViewState(t, {
            focus: true
          });
          return;
        }
      });
    }
    this.addCommand({
      id: `notice-debug`,
      name: `demo notice`,
      callback: () => {
        new import_obsidian3.Notice("demo notice");
        console.log("demo notice", new Date());
      }
    });
  }
  clearAutomation() {
    this.log("clear automation");
    for (let e of this.eventRefList) {
      this.app.workspace.offref(e);
    }
    this.eventRefList = [];
    for (let id of this.timeoutIdSet) {
      window.clearTimeout(id);
    }
    this.timeoutIdSet.clear();
  }
  updateAutomation() {
    this.clearAutomation();
    for (const Action of this.settings.actions) {
      if (Action.commands.length == 0 || !Action.enabled) {
        continue;
      }
      switch (Action.type) {
        case "event" /* event */:
          const eventRef = this.app.workspace.on(Action.eventSetting.type, () => {
            if (!this.eventFilter(Action.filters)) {
              return;
            }
            setTimeout(() => {
              for (let command of Action.commands) {
                if (command) {
                  let r = this.app.commands.executeCommandById(command.commandId);
                }
              }
            }, 100);
          });
          this.eventRefList.push(eventRef);
          this.registerEvent(eventRef);
          break;
        case "timeout" /* timeout */:
          this.setTimer(Action.id);
          break;
        default:
          break;
      }
    }
  }
  onunload() {
    this.clearAutomation();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // async ensureDefaultSettings() {
  // 	for (let i = 0; i < this.settings.actions.length; i++) {
  // 		this.settings.actions[i] = Object.assign({}, newDefaultActionSettings(), this.settings.actions[i]);
  // 	}
  // 	await this.saveSettings();
  // }
  eventFilter(filterSettings) {
    var _a, _b;
    for (let filterSetting of filterSettings) {
      switch (filterSetting.kind) {
        case "file path in Obsidian" /* filePath */:
          const path = (_a = this.app.workspace.getActiveFile()) == null ? void 0 : _a.path;
          if (path == void 0) {
            return false;
          }
          let pattern = filterSetting.pattern;
          if (filterSetting.modeCode) {
            pattern = fromStringCode(pattern);
            if (pattern == null) {
              return false;
            }
          }
          if (path.match(new RegExp(pattern))) {
            continue;
          }
          return false;
        case "tags" /* tags */:
          const file = this.app.workspace.getActiveFile();
          const frontmatter = (_b = this.app.metadataCache.getCache(file == null ? void 0 : file.path)) == null ? void 0 : _b.frontmatter;
          const tags = ensureString2list(frontmatter == null ? void 0 : frontmatter.tags);
          const targetTags = ensureString2list(filterSetting.pattern);
          if (tags.find((t) => targetTags.includes(t))) {
            continue;
          }
          return false;
        case "none" /* none */:
          continue;
        default:
          return false;
      }
    }
    return true;
  }
  log(...messages) {
    if (this.settings.debug.console)
      console.log(...messages);
    if (!this.settings.debug.writeLog)
      return;
    this.logs.push(`===> [${window.moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}]`);
    for (const message of messages) {
      this.logs.push(String(message));
    }
    this.app.vault.adapter.write(this.logFilePath, this.logs.join(" "));
  }
};
var AutomationSettingTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.commands = [];
    this.plugin = plugin;
    this.debounceResetSlowly = (0, import_obsidian3.debounce)(() => {
      plugin.debounceUpdateAutomation();
    }, 1e3 * 60);
  }
  loadObsidianCommands() {
    this.commands = [];
    Object.keys(this.app.commands.commands).forEach((key) => {
      const command = this.app.commands.commands[key];
      this.commands.push(new ObsidianCommand(command.name, command.id));
    });
  }
  display() {
    this.loadObsidianCommands();
    const { containerEl } = this;
    this.EntriesElList = [];
    containerEl.empty();
    let addEntryButton = new import_obsidian3.Setting(containerEl).addButton((button) => {
      button.setTooltip("Add new automation").setButtonText("Add Automation").setCta().onClick(async () => {
        const newActionSetting = Object.assign({}, newDefaultActionSettings(), { id: v4_default() });
        console.log(DefaultActionSettings);
        console.log(newActionSetting);
        this.plugin.settings.actions.push(newActionSetting);
        await this.plugin.saveSettings();
        this.display();
      });
    });
    for (let i = 0; i < this.plugin.settings.actions.length; i++) {
      this.EntriesElList.push(containerEl.createDiv());
      this.displayEntry(i);
    }
  }
  displayEntry(i) {
    const containerEl = this.EntriesElList[i];
    containerEl.empty();
    const Action = this.plugin.settings.actions[i];
    let input;
    const addActionSettings = () => {
      const value = input.getValue();
      if (value.trim() === "") {
        this.plugin.settings.actions[i].commands = [];
        new import_obsidian3.Notice("Command is removed!");
      } else {
        let command = this.commands.find((c) => c.name === value);
        if (command == void 0) {
          new import_obsidian3.Notice("Unknown Command!");
          return false;
        } else {
          this.plugin.settings.actions[i].commands[0] = command;
        }
        new import_obsidian3.Notice("Command has been saved!");
      }
      this.plugin.saveSettings();
      this.plugin.debounceUpdateAutomation();
      return true;
    };
    switch (Action.type) {
      case "event" /* event */:
        let headingEl = containerEl.createEl("h4", { text: `Event on ${Action.eventSetting.type}` });
        headingEl.empty();
        headingEl.append(
          createEl("span", { text: `Event on ` }),
          createEl("code", { text: `${Action.eventSetting.type}` })
        );
        break;
      case "timeout" /* timeout */:
        containerEl.createEl("h4", { text: `Timer` });
        break;
      default:
        containerEl.createEl("h4", { text: `Automation ${i}` });
        break;
    }
    let automationTypeSetting = new import_obsidian3.Setting(containerEl).setName(`Automation type`).addDropdown((dropDown) => dropDown.addOption("event" /* event */, "Trigger").addOption("timeout" /* timeout */, "Timer").setValue(Action.type || "event" /* event */).onChange(async (value) => {
      const oldValue = Action.type;
      this.plugin.settings.actions[i].type = value;
      await this.plugin.saveSettings();
      this.plugin.debounceUpdateAutomation();
      if (value != oldValue) {
        this.displayEntry(i);
      }
    })).addToggle((toggle) => {
      toggle.setValue(Action.enabled).setTooltip("Enable / Disable this automation").onChange(async (value) => {
        this.plugin.settings.actions[i].enabled = value;
        await this.plugin.saveSettings();
        this.plugin.debounceUpdateAutomation();
      });
    }).addButton(
      (button) => button.setCta().setButtonText("Delete this automation").setClass("automation-delete").onClick(async () => {
        this.plugin.settings.actions.splice(i, 1);
        await this.plugin.saveSettings();
        this.plugin.debounceUpdateAutomation();
        this.display();
      })
    );
    switch (Action.type) {
      case "timeout" /* timeout */:
        automationTypeSetting.setDesc(`Timer is an experimental feature.`);
        break;
    }
    switch (Action.type) {
      case "event" /* event */:
        new import_obsidian3.Setting(containerEl).setName(`Event type`).addDropdown(
          (dropDown) => dropDown.addOption("file-open" /* fileOpen */, "File open").addOption("active-leaf-change" /* activeLeafChange */, "Active leaf change").setValue(Action.eventSetting.type || "file-open" /* fileOpen */).onChange(async (value) => {
            const oldValue = Action.eventSetting.type;
            this.plugin.settings.actions[i].eventSetting.type = value;
            await this.plugin.saveSettings();
            this.debounceResetSlowly();
            if (value != oldValue) {
              this.display();
            }
          })
        );
        break;
      case "timeout" /* timeout */:
        let whenSetting = new import_obsidian3.Setting(containerEl).setName(`Everyday when`).setDesc(`Run commands on what time every day. (HH:MM format)`);
        whenSetting.addText((cb) => {
          cb.setPlaceholder(`HH:MM`).setValue(Action.timerSetting.when[0].HM).onChange(async (value) => {
            if (hourString2time(value) != null) {
              this.plugin.settings.actions[i].timerSetting.when[0].HM = value;
              await this.plugin.saveSettings();
              this.debounceResetSlowly();
              whenSetting.settingEl.classList.remove("automation-invalid-input");
            } else {
              whenSetting.setClass("automation-invalid-input");
            }
          });
        });
        if (hourString2time(Action.timerSetting.when[0].HM) == null) {
          whenSetting.setClass("automation-invalid-input");
        }
      default:
        break;
    }
    let commandSetting = new import_obsidian3.Setting(containerEl).setName(`Obsidian command`);
    commandSetting.addText((textComponent) => {
      var _a, _b;
      input = textComponent;
      textComponent.setPlaceholder("Obsidian command").setValue((_b = (_a = this.plugin.settings.actions[i]) == null ? void 0 : _a.commands[0]) == null ? void 0 : _b.name).onChange(async (value) => {
        var _a2, _b2, _c;
        const buttonEl = (_a2 = commandSetting.components[1]) == null ? void 0 : _a2.buttonEl;
        if (value === ((_c = (_b2 = this.plugin.settings.actions[i]) == null ? void 0 : _b2.commands[0]) == null ? void 0 : _c.name)) {
          buttonEl.classList.add("automation-hide");
        } else {
          buttonEl.classList.remove("automation-hide");
        }
      });
      new CommandSuggester(
        this.app,
        textComponent.inputEl,
        this.commands.map((c) => c.name)
      );
      textComponent.inputEl.addEventListener(
        "keypress",
        (e) => {
          var _a2;
          if (e.key.toLowerCase() === "enter") {
            if (addActionSettings()) {
              (_a2 = commandSetting.components[1]) == null ? void 0 : _a2.buttonEl.classList.add("automation-hide");
            }
          }
        }
      );
    });
    commandSetting.setClass("automation-wide-input");
    commandSetting.addButton(
      (button) => button.setCta().setButtonText("Save").setTooltip("The command is not saved yet. Click to save it.").setClass("automation-hide").onClick(() => {
        var _a;
        if (addActionSettings()) {
          (_a = commandSetting.components[1]) == null ? void 0 : _a.buttonEl.classList.add("automation-hide");
        }
      })
    );
    switch (Action.type) {
      case "event" /* event */:
        let filterSetting = new import_obsidian3.Setting(containerEl).setName(`File filter`).setDesc(genFilterDesc(this.plugin.settings.actions[i])).addDropdown((dropDown) => {
          var _a;
          return dropDown.addOption("none" /* none */, "-").addOption("file path in Obsidian" /* filePath */, "File path").addOption("tags" /* tags */, "Tags").setValue(((_a = Action == null ? void 0 : Action.filters[0]) == null ? void 0 : _a.kind) || "none" /* none */).onChange(async (value) => {
            var _a2;
            const oldValue = (_a2 = Action == null ? void 0 : Action.filters[0]) == null ? void 0 : _a2.kind;
            this.plugin.settings.actions[i].filters[0].kind = value;
            await this.plugin.saveSettings();
            this.debounceResetSlowly();
            if (value != oldValue) {
              this.display();
            }
          });
        });
        if (Action.filters[0].kind !== "none" /* none */) {
          filterSetting.addText((textComponent) => {
            var _a;
            textComponent.setPlaceholder("filter pattern");
            textComponent.setValue((_a = Action == null ? void 0 : Action.filters[0]) == null ? void 0 : _a.pattern);
            textComponent.onChange(async (value) => {
              this.plugin.settings.actions[i].filters[0].pattern = value;
              filterSetting.setDesc(genFilterDesc(this.plugin.settings.actions[i]));
              await this.plugin.saveSettings();
              this.debounceResetSlowly();
            });
          });
        }
        if (Action.filters[0].kind === "file path in Obsidian" /* filePath */) {
          filterSetting.addToggle((toggle) => {
            var _a;
            toggle.setValue((_a = Action == null ? void 0 : Action.filters[0]) == null ? void 0 : _a.modeCode).setTooltip("Source code mode").onChange(async (value) => {
              this.plugin.settings.actions[i].filters[0].modeCode = value;
              filterSetting.setDesc(genFilterDesc(this.plugin.settings.actions[i]));
              await this.plugin.saveSettings();
              this.plugin.debounceUpdateAutomation();
            });
          });
        }
        break;
      case "timeout" /* timeout */:
      default:
        break;
    }
  }
};

/* nosourcemap */