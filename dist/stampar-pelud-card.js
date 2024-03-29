const LitElement = customElements.get('home-assistant-main')
  ? Object.getPrototypeOf(customElements.get('home-assistant-main'))
  : Object.getPrototypeOf(customElements.get('hui-view'));
const html = LitElement.prototype.html;

class StamparPeludCard extends LitElement {

    constructor() {
        super();
        this.sensorTypes = {
              2 : "lijeska"       ,
              3 : "joha"          ,
              4 : "cempresi"      ,
              5 : "jasen"         ,
              6 : "breza"         ,
              7 : "grab"          ,
              8 : "hrast"         ,
              9 : "platana"       ,
              11: "koprive"       ,
              12: "pitomi_kesten" ,
              13: "ambrozija"     ,
              14: "pelin"         ,
              15: "loboda"        ,
              16: "maslina"       ,
              17: "bor"           ,
              18: "hrast_crnika"  ,
              19: "crkvina"       ,
              20: "vrba"          ,
              21: "trputac"       ,
              22: "topola"        ,
              25: "brijest"       ,
              26: "lipa"          ,
              27: "orah"          ,
              28: "kiselica"      ,
              90: "drvece"        ,
              10: "trave"         ,
              92: "korovi"        
        };
    }
    
    setConfig(config) {
        //console.log(config.allergens);
        if (!config.sensor) {
            throw new Error('Please define "sensor" entity in the card config');
        }
        this.sensor = config.sensor;
        if (!config.allergens) {
            this.allergens = this.sensorTypes;
        }
        else if ( ! ( config.allergens instanceof Array ) ) {
            throw new Error('Definition of "allergens" in the card config needs to be array - e.g. [1,2,3]');
        }
        else {
            console.log(config.allergens);
            this.allergens = {};
            for( var i in config.allergens ) {
                this.allergens[config.allergens[i]]=this.sensorTypes[config.allergens[i]];
            }
        }
        if (!config.icons) {
            this.icons = "pictogram";
        }
        else if ( ["pictogram", "set1", "set2"].indexOf(config.icons) < 0 ) {
            throw new Error('Definition of "icons" need to be one of: pictogram, set1, set2');
        }
        else {
            this.icons = config.icons;
        }

        if ( typeof(config.visible_only_active) == "undefined" ) {
            this.visible_only_active = false;
        }
        else {
            this.visible_only_active = config.visible_only_active;
        }

        this.config = config;
    }

  render(){
    if(this.sensors.length < 1) {
      console.log("No sensor data, not rendering card.")
      return;
    }
    return html
    `
    ${this._renderMinimalStyle()}
    ${this._renderMinimalCard()}

    `
  }

  _renderMinimalCard() {
    var l_ext;
    var l_suffix;
    switch ( this.icons ) {
        case "pictogram":
            l_ext = "svg";
            l_suffix = "";
            break;
        case "set1":
            l_ext = "png";
            l_suffix = "";
            break;
        case "set2":
            l_ext = "png";
            l_suffix = "_transparent";
            break;
        default:
            l_ext = "svg";
            l_suffix = "";
            break;
    }
    //console.log(this.sensors);
    this.sensors.sort( (a,b) => {
      const levelA = a.level_name;
      const levelB = b.level_name;
      if (levelA == levelB ) {
        return 0;
      }
      if (levelA == "unknown" && levelB != "unknown") {
        return 1;
      }
      if (levelA != "unknown" && levelB == "unknown") {
        return -1;
      }
      return -1;
    } );
    //console.log(this.sensors);
    return html
    `
    <ha-card header="${this.header} ${this.location} ${this.date}">
      <div class="flex-container">
        ${this.sensors.map(sensor => ( this.visible_only_active == false || sensor.level_name != 'unknown' ) ?
           html
            `<div class="sensor" @click="${() => this._sensorAttr(sensor.sensor_id)}">
                <div class="box_name">${sensor.status.attributes.name}</div>
                <div class="box_icon_${sensor.level_name}">
                  <img class="box_icon ${l_ext == "svg" ? "box_icon_filter_" + sensor.level_name : "" }" src="/local/community/lovelace-stampar-pelud-card/stampar_icons/${sensor.allergen_id}${l_suffix}${l_ext == "svg" && sensor.level_name != "unknown" ? "_0" : ""}.${l_ext}" />
                </div>
                <div class="box_state box_state_${sensor.level_name}">${sensor.status.state == "unknown" ? "" : sensor.status.state}&nbsp;</div>
                <div class="box_level">${sensor.status.attributes.level != sensor.status.state ? sensor.status.attributes.level : ""}&nbsp;</div>
                <div class="box_forecast">${this._renderForecast(sensor.status.attributes.forecast)}</div>
            </div>`
            : html ``
        )}
      </div>
    </ha-card>
    `
  }

  _renderForecast(o_forecast) {
    var a_ret = [];
    if ( typeof(o_forecast) != "undefined" ) {
      for ( var l_key in o_forecast ) {
        a_ret.push( html`${l_key.substring(0,6)}<img class="box_forecast_icon box_forecast_icon_${o_forecast[l_key]}" />&nbsp;&nbsp;` );
      }
    }
    return html`${a_ret}`;
  }

  _renderMinimalStyle() {
    return html
    `
    <style>
    ha-card {
    }
    .header {
    }
    .flex-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      text-align: center;
      justify-content: space-evenly;
      align-items: center;
    }
    .sensor {
      margin: 10px;
      flex: 1 1 0;
      flex-direction: column;
      justify-content: space-evenly;
      display: flex;
      align-self: flex-start;
      cursor: pointer;
    }
    @supports not (-ms-flex: 1) {
      .flex-container {
        height: auto; /* 2 */
        // min-height: 24em; /* 2 */
      }
    }
    img {
      max-width: 100px;
    }
    .sensor {
      display: block;
      min-width: 16.66%;
      flex: 1;
    }
    .box_icon {
    }
    .box_icon_unknown {
      filter: grayscale(100%) contrast(20%);
    }
    .box_icon_nemapeludi {
    }
    .box_icon_niska {
    }
    .box_icon_umjerena {
    }
    .box_icon_visoka {
    }
    .box_icon_vrlovisoka {
    }
    .box_icon_filter_unknown {
    }
    .box_icon_filter_nemapeludi {
    }
    .box_icon_filter_niska {
      filter: invert(2%) sepia(100%) saturate(2768%) hue-rotate(101deg) brightness(97%) contrast(104%);
    }
    .box_icon_filter_umjerena {
      filter: invert(6%) sepia(90%) saturate(1633%) hue-rotate(27deg) brightness(137%) contrast(102%);
    }
    .box_icon_filter_visoka {
      filter: invert(8%) sepia(31%) saturate(2243%) hue-rotate(359deg) brightness(125%) contrast(104%);
    }
    .box_icon_filter_vrlovisoka {
      filter: invert(9%) sepia(51%) saturate(5295%) hue-rotate(1deg) brightness(75%) contrast(120%);
    }
    .box_state {
    }
    .box_state_unknown {
      color: gray;
    }
    .box_state_nemapeludi {
      color: black;
    }
    .box_state_niska {
      color: green;
      font-weight: bold;
    }
    .box_state_umjerena {
      color: orange;
      font-weight: bold;
    }
    .box_state_visoka {
      color: red;
      font-weight: bold;
    }
    .box_state_vrlovisoka {
      color: red;
      text-decoration: overline;
      font-weight: bold;
    }
    .box_level {
      padding: 0px;
      font-size: x-small;
    }
    .box_forecast {
      font-size: x-small;
      vertical-align: middle;
    }
    .box_forecast_icon {
      vertical-align: middle;
      width: 10px;
      height: 10px;
    }
    .box_forecast_icon_nemapeludi {
      background-color: white;
    }
    .box_forecast_icon_niska {
      background-color: green;
    }
    .box_forecast_icon_umjerena {
      background-color: yellow;
    }
    .box_forecast_icon_visoka {
      background-color: orange;
    }
    .box_forecast_icon_vrlovisoka {
      background-color: red;
    }
    </style>`
  }

    set hass(hass) {
        this._hass = hass;
        var sensors = [];

        this.header = this.sensor;

        var allergen_prefix = this.sensor
        allergen_prefix = allergen_prefix.replace(' ', '_').toLowerCase();

        const allergens = this.allergens;
        var icnt = 0;
        for (var i in allergens) {
          var dict = {};

          var sensor_id = `sensor.${allergen_prefix}_${allergens[i]}`;
          dict.sensor_id = sensor_id;
          dict.allergen_id = allergens[i];
          dict.status = hass.states[sensor_id];
          if (dict.status === undefined) {
              var log_text = `Sensor "${sensor_id}" is undefined, check your configuration of custom component and allergens`;
              console.log(log_text);
              continue;
          }
          if (dict.status.state == "unknown") {
            dict.level_name = "unknown";
          }
          else {
            this.date = dict.status.attributes.date
            dict.level_name = dict.status.attributes.level.replace(" ", "");
          }

          this.location = dict.status.attributes.station
          sensors.push(dict)
          icnt++;
        }

        this.sensors = sensors;
        this.requestUpdate();
    }

    getCardSize() {
        return 4;
    }

    _fire(type, detail, options) {
        const node = this.shadowRoot;
        options = options || {};
        detail = (detail === null || detail === undefined) ? {} : detail;
        const e = new Event(type, {
            bubbles: options.bubbles === undefined ? true : options.bubbles,
            cancelable: Boolean(options.cancelable),
            composed: options.composed === undefined ? true : options.composed
        });
        e.detail = detail;
        node.dispatchEvent(e);
        return e;
    }
  
    _sensorAttr(i_obj) {
        this._fire('hass-more-info', { entityId: i_obj });
    }
  }

class HAPC extends StamparPeludCard {} ;
customElements.define('stampar-pelud-card', StamparPeludCard);
