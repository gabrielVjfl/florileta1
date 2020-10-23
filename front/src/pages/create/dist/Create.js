"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
//import SideBar from '../../components/SideBar'
var react_leaflet_1 = require("react-leaflet");
var reciclagem_logo_png_1 = require("../../images/reciclagem-logo.png");
var fa_1 = require("react-icons/fa");
var react_router_dom_1 = require("react-router-dom");
var leaflet_1 = require("leaflet");
require("./Create.css");
var axios_1 = require("axios");
var building_png_1 = require("../../images/building.png");
var gmail_png_1 = require("../../images/gmail.png");
var whatsapp_png_1 = require("../../images/whatsapp.png");
var road_png_1 = require("../../images/road.png");
var identity_png_1 = require("../../images/identity.png");
var gps_png_1 = require("../../images/gps.png");
var MapIcon = leaflet_1["default"].icon({
    iconUrl: gps_png_1["default"],
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -30]
});
var Create = function () {
    var _a = react_1.useState({ latitude: 0, longitude: 0 }), position = _a[0], setPosition = _a[1];
    var INITIAL_STATE = {
        position: position,
        name: '',
        email: '',
        whatsapp: '',
        cidade: '',
        endereco: '',
        numero: 0,
        items: []
    };
    var _b = react_1.useState(INITIAL_STATE), state = _b[0], setState = _b[1];
    //  const [position, setPosition] = useState({latitude: 0, longitude: 0})
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [whatsapp, setWhatsapp] = useState('')
    // const [cidade, setCidade] = useState('')
    // const [endereco, setEndereco] = useState('')
    // const [numero, setNumero] = useState<number>(0)
    // const [items, setItems] = useState<string[]>([])
    // const [state, setState] = useState({
    //   position,
    //   name,
    //    email,
    //   whatsapp,
    //   cidade,
    //   endereco,
    //     numero,
    //      items
    //  })
    function handleMapClick(event) {
        var _a = event.latlng, lat = _a.lat, lng = _a.lng;
        setPosition({
            latitude: lat,
            longitude: lng
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios_1["default"].post('http://localhost:7777/api/points/create').then(function (response) {
            console.log(response);
            alert('Salvou');
        })["catch"](function (err) {
            console.log(err);
            alert('Deu erro');
        });
    }
    var HandleChange = function (e) {
        var _a;
        setState(__assign(__assign({}, state), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    return (react_1["default"].createElement("div", { id: "template_create" },
        react_1["default"].createElement("aside", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/" },
                react_1["default"].createElement("button", { className: "btn btn-warning", id: "btnleft" },
                    react_1["default"].createElement(fa_1.FaArrowLeft, null))),
            react_1["default"].createElement("header", null,
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("img", { src: reciclagem_logo_png_1["default"], height: "80px", width: "80px" }),
                react_1["default"].createElement("h2", null, "Florileta"),
                react_1["default"].createElement("h3", null, "Cadastre um ponto de coleta"),
                react_1["default"].createElement("p", null, "A natureza agradece!")),
            react_1["default"].createElement("footer", null,
                react_1["default"].createElement("strong", null, "Florian\u00F3polis"),
                react_1["default"].createElement("span", null, "Santa Catarina"))),
        react_1["default"].createElement("div", { className: "content_create" },
            react_1["default"].createElement("div", { className: "card" },
                react_1["default"].createElement("div", { className: "card-body" },
                    react_1["default"].createElement("h1", null, "Cadastre um ponto de coleta"),
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("form", { onSubmit: handleSubmit },
                        react_1["default"].createElement("fieldset", null,
                            react_1["default"].createElement("legend", null, "Dados"),
                            react_1["default"].createElement("label", null, "Selecione o local no mapa!"),
                            react_1["default"].createElement(react_leaflet_1.Map, { center: [-27.5884465, -48.506986], style: { width: '100%', height: 280, borderRadius: '20px' }, zoom: 11, onclick: handleMapClick },
                                react_1["default"].createElement(react_leaflet_1.TileLayer, { url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
                                position.latitude !== 0 && (react_1["default"].createElement(react_leaflet_1.Marker, { interactive: false, icon: MapIcon, position: [
                                        position.latitude,
                                        position.longitude
                                    ] }))),
                            react_1["default"].createElement("label", null,
                                "Nome do ponto de coleta ",
                                react_1["default"].createElement("img", { src: identity_png_1["default"], height: "30px", width: "30px" })),
                            react_1["default"].createElement("input", { name: "name", required: true, className: "form-control", autoFocus: true, type: "text", placeholder: "Digite o nome do ponto de coleta" }),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("label", null,
                                "Email ",
                                react_1["default"].createElement("img", { src: gmail_png_1["default"], height: "30px", width: "30px" })),
                            react_1["default"].createElement("input", { name: "email", required: true, className: "form-control", type: "email", placeholder: "Digite o seu melhor email" }),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("label", null,
                                "WhatsApp - Telefone ",
                                react_1["default"].createElement("img", { src: whatsapp_png_1["default"], height: "30px", width: "30px" })),
                            react_1["default"].createElement("input", { name: "whatsapp", required: true, className: "form-control", type: "text", placeholder: "Digite o n\u00FAmero do celular" }),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("p", { id: "location" }, "Localiza\u00E7\u00E3o"),
                            react_1["default"].createElement("div", { id: "localizacao" }),
                            react_1["default"].createElement("label", null,
                                "Endere\u00E7o ",
                                react_1["default"].createElement("img", { src: road_png_1["default"], height: "30px", width: "30px" })),
                            react_1["default"].createElement("input", { name: "endereco", required: true, className: "form-control", type: "text", placeholder: "Digite o endere\u00E7o" }),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("label", null,
                                "N\u00FAmero ",
                                react_1["default"].createElement("img", { src: road_png_1["default"], height: "30px", width: "30px" })),
                            react_1["default"].createElement("input", { name: "numero", required: true, className: "form-control", type: "number", placeholder: "N\u00FAmero de endere\u00E7o" }),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("label", { htmlFor: "cidade" },
                                "Cidade ",
                                react_1["default"].createElement("img", { src: building_png_1["default"], height: "30px", width: "30px" })),
                            react_1["default"].createElement("select", { name: "cidade", className: "form-control" },
                                react_1["default"].createElement("option", { value: "" }, "Selecione a Cidade"),
                                react_1["default"].createElement("option", { value: "Florian\u00F3polis" }, "Florian\u00F3polis"),
                                react_1["default"].createElement("option", { value: "Bigua\u00E7u" }, "Bigua\u00E7u"),
                                react_1["default"].createElement("option", { value: "Palho\u00E7a" }, "Palho\u00E7a"),
                                react_1["default"].createElement("option", { value: "S\u00E3o Jos\u00E9" }, "S\u00E3o Jos\u00E9")),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("label", null, "Lampadas"),
                            react_1["default"].createElement("input", { type: "checkbox", value: "1", name: "items" }),
                            react_1["default"].createElement("label", null, "Pilhas e Baterias"),
                            react_1["default"].createElement("input", { type: "checkbox", value: "2", name: "items" }),
                            react_1["default"].createElement("label", null, "Pap\u00E9is e Papel\u00E3o"),
                            react_1["default"].createElement("input", { type: "checkbox", value: "3", name: "items" }),
                            react_1["default"].createElement("label", null, "Res\u00EDduos Eletronicos"),
                            react_1["default"].createElement("input", { type: "checkbox", value: "4", name: "items" }),
                            react_1["default"].createElement("label", null, "Residuos Organicos"),
                            react_1["default"].createElement("input", { type: "checkbox", value: "5", name: "items" }),
                            react_1["default"].createElement("label", null, "\u00D3leo de cozinha"),
                            react_1["default"].createElement("input", { type: "checkbox", value: "6", name: "items" }),
                            react_1["default"].createElement("br", null),
                            react_1["default"].createElement("button", { type: "submit", id: "btnsubmit", className: "btn btn-warning" }, "Registrar"))))))));
};
exports["default"] = Create;
