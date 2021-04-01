const searchCounties = [
  {
    "usps": "DE",
    "county": "Kent",
    "lat": "39.097088",
    "long": "-75.502982"
  },
  {
    "usps": "DE",
    "county": "New Castle",
    "lat": "39.575915",
    "long": "-75.644132"
  },
  {
    "usps": "DE",
    "county": "Sussex",
    "lat": "38.673227",
    "long": "-75.337024"
  },
  {
    "usps": "MD",
    "county": "Allegany",
    "lat": "39.612313",
    "long": "-78.703104"
  },
  {
    "usps": "MD",
    "county": "Anne Arundel",
    "lat": "38.991617",
    "long": "-76.560894"
  },
  {
    "usps": "MD",
    "county": "Baltimore",
    "lat": "39.443167",
    "long": "-76.616569"
  },
  {
    "usps": "MD",
    "county": "Calvert",
    "lat": "38.522719",
    "long": "-76.529762"
  },
  {
    "usps": "MD",
    "county": "Caroline",
    "lat": "38.871531",
    "long": "-75.831662"
  },
  {
    "usps": "MD",
    "county": "Carroll",
    "lat": "39.563328",
    "long": "-77.01533"
  },
  {
    "usps": "MD",
    "county": "Cecil",
    "lat": "39.562354",
    "long": "-75.941585"
  },
  {
    "usps": "MD",
    "county": "Charles",
    "lat": "38.472853",
    "long": "-77.015427"
  },
  {
    "usps": "MD",
    "county": "Dorchester",
    "lat": "38.429196",
    "long": "-76.047433"
  },
  {
    "usps": "MD",
    "county": "Frederick",
    "lat": "39.470177",
    "long": "-77.397636"
  },
  {
    "usps": "MD",
    "county": "Garrett",
    "lat": "39.547299",
    "long": "-79.274619"
  },
  {
    "usps": "MD",
    "county": "Harford",
    "lat": "39.537429",
    "long": "-76.299789"
  },
  {
    "usps": "MD",
    "county": "Howard",
    "lat": "39.252264",
    "long": "-76.924406"
  },
  {
    "usps": "MD",
    "county": "Kent",
    "lat": "39.241279",
    "long": "-76.125987"
  },
  {
    "usps": "MD",
    "county": "Montgomery",
    "lat": "39.137381",
    "long": "-77.203063"
  },
  {
    "usps": "MD",
    "county": "Prince George's",
    "lat": "38.829278",
    "long": "-76.848188"
  },
  {
    "usps": "MD",
    "county": "Queen Anne's",
    "lat": "39.040693",
    "long": "-76.082405"
  },
  {
    "usps": "MD",
    "county": "St. Mary's",
    "lat": "38.223077",
    "long": "-76.534487"
  },
  {
    "usps": "MD",
    "county": "Somerset",
    "lat": "38.07445",
    "long": "-75.853323"
  },
  {
    "usps": "MD",
    "county": "Talbot",
    "lat": "38.748349",
    "long": "-76.178476"
  },
  {
    "usps": "MD",
    "county": "Washington",
    "lat": "39.603621",
    "long": "-77.814671"
  },
  {
    "usps": "MD",
    "county": "Wicomico",
    "lat": "38.36737",
    "long": "-75.632083"
  },
  {
    "usps": "MD",
    "county": "Worcester",
    "lat": "38.222133",
    "long": "-75.309931"
  },
  {
    "usps": "MD",
    "county": "Baltimore",
    "lat": "39.300032",
    "long": "-76.610476"
  },
  {
    "usps": "NY",
    "county": "Albany",
    "lat": "42.58824",
    "long": "-73.97401"
  },
  {
    "usps": "NY",
    "county": "Allegany",
    "lat": "42.247853",
    "long": "-78.026153"
  },
  {
    "usps": "NY",
    "county": "Bronx",
    "lat": "40.848711",
    "long": "-73.852939"
  },
  {
    "usps": "NY",
    "county": "Broome",
    "lat": "42.161977",
    "long": "-75.830283"
  },
  {
    "usps": "NY",
    "county": "Cattaraugus",
    "lat": "42.239099",
    "long": "-78.662332"
  },
  {
    "usps": "NY",
    "county": "Cayuga",
    "lat": "43.008546",
    "long": "-76.574587"
  },
  {
    "usps": "NY",
    "county": "Chautauqua",
    "lat": "42.304216",
    "long": "-79.407595"
  },
  {
    "usps": "NY",
    "county": "Chemung",
    "lat": "42.148697",
    "long": "-76.752471"
  },
  {
    "usps": "NY",
    "county": "Chenango",
    "lat": "42.478024",
    "long": "-75.602241"
  },
  {
    "usps": "NY",
    "county": "Clinton",
    "lat": "44.752712",
    "long": "-73.705643"
  },
  {
    "usps": "NY",
    "county": "Columbia",
    "lat": "42.247696",
    "long": "-73.626718"
  },
  {
    "usps": "NY",
    "county": "Cortland",
    "lat": "42.594039",
    "long": "-76.07624"
  },
  {
    "usps": "NY",
    "county": "Delaware",
    "lat": "42.193986",
    "long": "-74.966728"
  },
  {
    "usps": "NY",
    "county": "Dutchess",
    "lat": "41.75477",
    "long": "-73.740041"
  },
  {
    "usps": "NY",
    "county": "Erie",
    "lat": "42.752759",
    "long": "-78.778192"
  },
  {
    "usps": "NY",
    "county": "Essex",
    "lat": "44.109601",
    "long": "-73.778431"
  },
  {
    "usps": "NY",
    "county": "Franklin",
    "lat": "44.594376",
    "long": "-74.31067"
  },
  {
    "usps": "NY",
    "county": "Fulton",
    "lat": "43.115609",
    "long": "-74.423678"
  },
  {
    "usps": "NY",
    "county": "Genesee",
    "lat": "43.00091",
    "long": "-78.192778"
  },
  {
    "usps": "NY",
    "county": "Greene",
    "lat": "42.279821",
    "long": "-74.142025"
  },
  {
    "usps": "NY",
    "county": "Hamilton",
    "lat": "43.657879",
    "long": "-74.502456"
  },
  {
    "usps": "NY",
    "county": "Herkimer",
    "lat": "43.571009",
    "long": "-74.841097"
  },
  {
    "usps": "NY",
    "county": "Jefferson",
    "lat": "43.996389",
    "long": "-76.052968"
  },
  {
    "usps": "NY",
    "county": "Kings",
    "lat": "40.635045",
    "long": "-73.95064"
  },
  {
    "usps": "NY",
    "county": "Lewis",
    "lat": "43.782681",
    "long": "-75.44414"
  },
  {
    "usps": "NY",
    "county": "Livingston",
    "lat": "42.729042",
    "long": "-77.778463"
  },
  {
    "usps": "NY",
    "county": "Madison",
    "lat": "42.910026",
    "long": "-75.663575"
  },
  {
    "usps": "NY",
    "county": "Monroe",
    "lat": "43.250347",
    "long": "-77.700518"
  },
  {
    "usps": "NY",
    "county": "Montgomery",
    "lat": "42.900891",
    "long": "-74.435357"
  },
  {
    "usps": "NY",
    "county": "Nassau",
    "lat": "40.729612",
    "long": "-73.589414"
  },
  {
    "usps": "NY",
    "county": "New York",
    "lat": "40.776642",
    "long": "-73.970187"
  },
  {
    "usps": "NY",
    "county": "Niagara",
    "lat": "43.272672",
    "long": "-78.812943"
  },
  {
    "usps": "NY",
    "county": "Oneida",
    "lat": "43.242727",
    "long": "-75.434282"
  },
  {
    "usps": "NY",
    "county": "Onondaga",
    "lat": "43.006516",
    "long": "-76.196134"
  },
  {
    "usps": "NY",
    "county": "Ontario",
    "lat": "42.856357",
    "long": "-77.303497"
  },
  {
    "usps": "NY",
    "county": "Orange",
    "lat": "41.40241",
    "long": "-74.306252"
  },
  {
    "usps": "NY",
    "county": "Orleans",
    "lat": "43.339906",
    "long": "-78.207028"
  },
  {
    "usps": "NY",
    "county": "Oswego",
    "lat": "43.461443",
    "long": "-76.209262"
  },
  {
    "usps": "NY",
    "county": "Otsego",
    "lat": "42.629776",
    "long": "-75.028841"
  },
  {
    "usps": "NY",
    "county": "Putnam",
    "lat": "41.427907",
    "long": "-73.743861"
  },
  {
    "usps": "NY",
    "county": "Queens",
    "lat": "40.654658",
    "long": "-73.841209"
  },
  {
    "usps": "NY",
    "county": "Rensselaer",
    "lat": "42.710421",
    "long": "-73.513845"
  },
  {
    "usps": "NY",
    "county": "Richmond",
    "lat": "40.561263",
    "long": "-74.1399"
  },
  {
    "usps": "NY",
    "county": "Rockland",
    "lat": "41.154628",
    "long": "-74.024662"
  },
  {
    "usps": "NY",
    "county": "St. Lawrence",
    "lat": "44.488112",
    "long": "-75.074311"
  },
  {
    "usps": "NY",
    "county": "Saratoga",
    "lat": "43.106135",
    "long": "-73.855387"
  },
  {
    "usps": "NY",
    "county": "Schenectady",
    "lat": "42.817552",
    "long": "-74.043559"
  },
  {
    "usps": "NY",
    "county": "Schoharie",
    "lat": "42.591294",
    "long": "-74.438172"
  },
  {
    "usps": "NY",
    "county": "Schuyler",
    "lat": "42.419776",
    "long": "-76.938603"
  },
  {
    "usps": "NY",
    "county": "Seneca",
    "lat": "42.782294",
    "long": "-76.827088"
  },
  {
    "usps": "NY",
    "county": "Steuben",
    "lat": "42.266725",
    "long": "-77.385525"
  },
  {
    "usps": "NY",
    "county": "Suffolk",
    "lat": "40.943554",
    "long": "-72.692218"
  },
  {
    "usps": "NY",
    "county": "Sullivan",
    "lat": "41.719993",
    "long": "-74.771577"
  },
  {
    "usps": "NY",
    "county": "Tioga",
    "lat": "42.178057",
    "long": "-76.297456"
  },
  {
    "usps": "NY",
    "county": "Tompkins",
    "lat": "42.453006",
    "long": "-76.473483"
  },
  {
    "usps": "NY",
    "county": "Ulster",
    "lat": "41.947212",
    "long": "-74.265458"
  },
  {
    "usps": "NY",
    "county": "Warren",
    "lat": "43.555105",
    "long": "-73.838139"
  },
  {
    "usps": "NY",
    "county": "Washington",
    "lat": "43.312377",
    "long": "-73.439428"
  },
  {
    "usps": "NY",
    "county": "Wayne",
    "lat": "43.218114",
    "long": "-77.049402"
  },
  {
    "usps": "NY",
    "county": "Westchester",
    "lat": "41.152686",
    "long": "-73.745753"
  },
  {
    "usps": "NY",
    "county": "Wyoming",
    "lat": "42.701363",
    "long": "-78.228567"
  },
  {
    "usps": "NY",
    "county": "Yates",
    "lat": "42.638237",
    "long": "-77.104324"
  },
  {
    "usps": "PA",
    "county": "Adams",
    "lat": "39.869471",
    "long": "-77.21773"
  },
  {
    "usps": "PA",
    "county": "Allegheny",
    "lat": "40.469757",
    "long": "-79.980451"
  },
  {
    "usps": "PA",
    "county": "Armstrong",
    "lat": "40.81238",
    "long": "-79.464129"
  },
  {
    "usps": "PA",
    "county": "Beaver",
    "lat": "40.68414",
    "long": "-80.350721"
  },
  {
    "usps": "PA",
    "county": "Bedford",
    "lat": "39.998634",
    "long": "-78.494747"
  },
  {
    "usps": "PA",
    "county": "Berks",
    "lat": "40.413957",
    "long": "-75.92686"
  },
  {
    "usps": "PA",
    "county": "Blair",
    "lat": "40.498683",
    "long": "-78.309597"
  },
  {
    "usps": "PA",
    "county": "Bradford",
    "lat": "41.791504",
    "long": "-76.502123"
  },
  {
    "usps": "PA",
    "county": "Bucks",
    "lat": "40.336887",
    "long": "-75.10706"
  },
  {
    "usps": "PA",
    "county": "Butler",
    "lat": "40.913847",
    "long": "-79.918978"
  },
  {
    "usps": "PA",
    "county": "Cambria",
    "lat": "40.510227",
    "long": "-78.710477"
  },
  {
    "usps": "PA",
    "county": "Cameron",
    "lat": "41.438291",
    "long": "-78.198323"
  },
  {
    "usps": "PA",
    "county": "Carbon",
    "lat": "40.918367",
    "long": "-75.705039"
  },
  {
    "usps": "PA",
    "county": "Centre",
    "lat": "40.909128",
    "long": "-77.847877"
  },
  {
    "usps": "PA",
    "county": "Chester",
    "lat": "39.974029",
    "long": "-75.749751"
  },
  {
    "usps": "PA",
    "county": "Clarion",
    "lat": "41.198159",
    "long": "-79.420369"
  },
  {
    "usps": "PA",
    "county": "Clearfield",
    "lat": "41.006862",
    "long": "-78.477724"
  },
  {
    "usps": "PA",
    "county": "Clinton",
    "lat": "41.239508",
    "long": "-77.629009"
  },
  {
    "usps": "PA",
    "county": "Columbia",
    "lat": "41.045517",
    "long": "-76.40426"
  },
  {
    "usps": "PA",
    "county": "Crawford",
    "lat": "41.687876",
    "long": "-80.107795"
  },
  {
    "usps": "PA",
    "county": "Cumberland",
    "lat": "40.164805",
    "long": "-77.263442"
  },
  {
    "usps": "PA",
    "county": "Dauphin",
    "lat": "40.412565",
    "long": "-76.792634"
  },
  {
    "usps": "PA",
    "county": "Delaware",
    "lat": "39.916685",
    "long": "-75.398818"
  },
  {
    "usps": "PA",
    "county": "Elk",
    "lat": "41.427332",
    "long": "-78.653937"
  },
  {
    "usps": "PA",
    "county": "Erie",
    "lat": "42.117952",
    "long": "-80.096386"
  },
  {
    "usps": "PA",
    "county": "Fayette",
    "lat": "39.918907",
    "long": "-79.640119"
  },
  {
    "usps": "PA",
    "county": "Forest",
    "lat": "41.513304",
    "long": "-79.249705"
  },
  {
    "usps": "PA",
    "county": "Franklin",
    "lat": "39.926772",
    "long": "-77.724521"
  },
  {
    "usps": "PA",
    "county": "Fulton",
    "lat": "39.91075",
    "long": "-78.122617"
  },
  {
    "usps": "PA",
    "county": "Greene",
    "lat": "39.847707",
    "long": "-80.225655"
  },
  {
    "usps": "PA",
    "county": "Huntingdon",
    "lat": "40.422311",
    "long": "-77.968595"
  },
  {
    "usps": "PA",
    "county": "Indiana",
    "lat": "40.651432",
    "long": "-79.087545"
  },
  {
    "usps": "PA",
    "county": "Jefferson",
    "lat": "41.138028",
    "long": "-79.012419"
  },
  {
    "usps": "PA",
    "county": "Juniata",
    "lat": "40.530673",
    "long": "-77.400438"
  },
  {
    "usps": "PA",
    "county": "Lackawanna",
    "lat": "41.440284",
    "long": "-75.609666"
  },
  {
    "usps": "PA",
    "county": "Lancaster",
    "lat": "40.041992",
    "long": "-76.250198"
  },
  {
    "usps": "PA",
    "county": "Lawrence",
    "lat": "40.992735",
    "long": "-80.334446"
  },
  {
    "usps": "PA",
    "county": "Lebanon",
    "lat": "40.371448",
    "long": "-76.464819"
  },
  {
    "usps": "PA",
    "county": "Lehigh",
    "lat": "40.614241",
    "long": "-75.590627"
  },
  {
    "usps": "PA",
    "county": "Luzerne",
    "lat": "41.173078",
    "long": "-75.976053"
  },
  {
    "usps": "PA",
    "county": "Lycoming",
    "lat": "41.343882",
    "long": "-77.055262"
  },
  {
    "usps": "PA",
    "county": "McKean",
    "lat": "41.81459",
    "long": "-78.572463"
  },
  {
    "usps": "PA",
    "county": "Mercer",
    "lat": "41.300014",
    "long": "-80.252786"
  },
  {
    "usps": "PA",
    "county": "Mifflin",
    "lat": "40.601615",
    "long": "-77.651832"
  },
  {
    "usps": "PA",
    "county": "Monroe",
    "lat": "41.05624",
    "long": "-75.329065"
  },
  {
    "usps": "PA",
    "county": "Montgomery",
    "lat": "40.209999",
    "long": "-75.370201"
  },
  {
    "usps": "PA",
    "county": "Montour",
    "lat": "41.029284",
    "long": "-76.665225"
  },
  {
    "usps": "PA",
    "county": "Northampton",
    "lat": "40.752791",
    "long": "-75.307447"
  },
  {
    "usps": "PA",
    "county": "Northumberland",
    "lat": "40.851524",
    "long": "-76.709877"
  },
  {
    "usps": "PA",
    "county": "Perry",
    "lat": "40.39778",
    "long": "-77.266328"
  },
  {
    "usps": "PA",
    "county": "Philadelphia",
    "lat": "40.009376",
    "long": "-75.133346"
  },
  {
    "usps": "PA",
    "county": "Pike",
    "lat": "41.325949",
    "long": "-75.031514"
  },
  {
    "usps": "PA",
    "county": "Potter",
    "lat": "41.748587",
    "long": "-77.894436"
  },
  {
    "usps": "PA",
    "county": "Schuylkill",
    "lat": "40.703682",
    "long": "-76.217788"
  },
  {
    "usps": "PA",
    "county": "Snyder",
    "lat": "40.755407",
    "long": "-77.072929"
  },
  {
    "usps": "PA",
    "county": "Somerset",
    "lat": "39.981297",
    "long": "-79.028486"
  },
  {
    "usps": "PA",
    "county": "Sullivan",
    "lat": "41.439285",
    "long": "-76.511717"
  },
  {
    "usps": "PA",
    "county": "Susquehanna",
    "lat": "41.819665",
    "long": "-75.800969"
  },
  {
    "usps": "PA",
    "county": "Tioga",
    "lat": "41.766859",
    "long": "-77.257288"
  },
  {
    "usps": "PA",
    "county": "Union",
    "lat": "40.962179",
    "long": "-77.055475"
  },
  {
    "usps": "PA",
    "county": "Venango",
    "lat": "41.400714",
    "long": "-79.765813"
  },
  {
    "usps": "PA",
    "county": "Warren",
    "lat": "41.834298",
    "long": "-79.298182"
  },
  {
    "usps": "PA",
    "county": "Washington",
    "lat": "40.200005",
    "long": "-80.252132"
  },
  {
    "usps": "PA",
    "county": "Wayne",
    "lat": "41.646602",
    "long": "-75.292493"
  },
  {
    "usps": "PA",
    "county": "Westmoreland",
    "lat": "40.311068",
    "long": "-79.466688"
  },
  {
    "usps": "PA",
    "county": "Wyoming",
    "lat": "41.525173",
    "long": "-76.008731"
  },
  {
    "usps": "PA",
    "county": "York",
    "lat": "39.921751",
    "long": "-76.728889"
  },
  {
    "usps": "VA",
    "county": "Accomack",
    "lat": "37.765944",
    "long": "-75.757807"
  },
  {
    "usps": "VA",
    "county": "Albemarle",
    "lat": "38.024184",
    "long": "-78.553506"
  },
  {
    "usps": "VA",
    "county": "Alleghany",
    "lat": "37.787905",
    "long": "-80.008669"
  },
  {
    "usps": "VA",
    "county": "Amelia",
    "lat": "37.331927",
    "long": "-77.977462"
  },
  {
    "usps": "VA",
    "county": "Amherst",
    "lat": "37.629304",
    "long": "-79.154667"
  },
  {
    "usps": "VA",
    "county": "Appomattox",
    "lat": "37.370725",
    "long": "-78.81094"
  },
  {
    "usps": "VA",
    "county": "Arlington",
    "lat": "38.878337",
    "long": "-77.100703"
  },
  {
    "usps": "VA",
    "county": "Augusta",
    "lat": "38.17259",
    "long": "-79.140975"
  },
  {
    "usps": "VA",
    "county": "Bath",
    "lat": "38.068368",
    "long": "-79.731203"
  },
  {
    "usps": "VA",
    "county": "Bedford",
    "lat": "37.312257",
    "long": "-79.527223"
  },
  {
    "usps": "VA",
    "county": "Bland",
    "lat": "37.130612",
    "long": "-81.125853"
  },
  {
    "usps": "VA",
    "county": "Botetourt",
    "lat": "37.565482",
    "long": "-79.797546"
  },
  {
    "usps": "VA",
    "county": "Brunswick",
    "lat": "36.764204",
    "long": "-77.861483"
  },
  {
    "usps": "VA",
    "county": "Buchanan",
    "lat": "37.26812",
    "long": "-82.038151"
  },
  {
    "usps": "VA",
    "county": "Buckingham",
    "lat": "37.573928",
    "long": "-78.529169"
  },
  {
    "usps": "VA",
    "county": "Campbell",
    "lat": "37.210152",
    "long": "-79.095428"
  },
  {
    "usps": "VA",
    "county": "Caroline",
    "lat": "38.028033",
    "long": "-77.353736"
  },
  {
    "usps": "VA",
    "county": "Carroll",
    "lat": "36.731963",
    "long": "-80.727831"
  },
  {
    "usps": "VA",
    "county": "Charles City",
    "lat": "37.361054",
    "long": "-77.05417"
  },
  {
    "usps": "VA",
    "county": "Charlotte",
    "lat": "37.009042",
    "long": "-78.658568"
  },
  {
    "usps": "VA",
    "county": "Chesterfield",
    "lat": "37.378434",
    "long": "-77.585847"
  },
  {
    "usps": "VA",
    "county": "Clarke",
    "lat": "39.115307",
    "long": "-77.990748"
  },
  {
    "usps": "VA",
    "county": "Craig",
    "lat": "37.473603",
    "long": "-80.231051"
  },
  {
    "usps": "VA",
    "county": "Culpeper",
    "lat": "38.48593",
    "long": "-77.956476"
  },
  {
    "usps": "VA",
    "county": "Cumberland",
    "lat": "37.520189",
    "long": "-78.252836"
  },
  {
    "usps": "VA",
    "county": "Dickenson",
    "lat": "37.136701",
    "long": "-82.34922"
  },
  {
    "usps": "VA",
    "county": "Dinwiddie",
    "lat": "37.073498",
    "long": "-77.635492"
  },
  {
    "usps": "VA",
    "county": "Essex",
    "lat": "37.936389",
    "long": "-76.933747"
  },
  {
    "usps": "VA",
    "county": "Fairfax",
    "lat": "38.82952",
    "long": "-77.273252"
  },
  {
    "usps": "VA",
    "county": "Fauquier",
    "lat": "38.744096",
    "long": "-77.8215"
  },
  {
    "usps": "VA",
    "county": "Floyd",
    "lat": "36.931433",
    "long": "-80.350266"
  },
  {
    "usps": "VA",
    "county": "Fluvanna",
    "lat": "37.830584",
    "long": "-78.283494"
  },
  {
    "usps": "VA",
    "county": "Franklin",
    "lat": "36.991186",
    "long": "-79.882715"
  },
  {
    "usps": "VA",
    "county": "Frederick",
    "lat": "39.20366",
    "long": "-78.263829"
  },
  {
    "usps": "VA",
    "county": "Giles",
    "lat": "37.318072",
    "long": "-80.698321"
  },
  {
    "usps": "VA",
    "county": "Gloucester",
    "lat": "37.403541",
    "long": "-76.523505"
  },
  {
    "usps": "VA",
    "county": "Goochland",
    "lat": "37.718814",
    "long": "-77.917626"
  },
  {
    "usps": "VA",
    "county": "Grayson",
    "lat": "36.652229",
    "long": "-81.215324"
  },
  {
    "usps": "VA",
    "county": "Greene",
    "lat": "38.297981",
    "long": "-78.470163"
  },
  {
    "usps": "VA",
    "county": "Greensville",
    "lat": "36.680336",
    "long": "-77.560277"
  },
  {
    "usps": "VA",
    "county": "Halifax",
    "lat": "36.766461",
    "long": "-78.939614"
  },
  {
    "usps": "VA",
    "county": "Hanover",
    "lat": "37.760215",
    "long": "-77.491317"
  },
  {
    "usps": "VA",
    "county": "Henrico",
    "lat": "37.43752",
    "long": "-77.300333"
  },
  {
    "usps": "VA",
    "county": "Henry",
    "lat": "36.620612",
    "long": "-79.980662"
  },
  {
    "usps": "VA",
    "county": "Highland",
    "lat": "38.366243",
    "long": "-79.564472"
  },
  {
    "usps": "VA",
    "county": "Isle of Wight",
    "lat": "36.901418",
    "long": "-76.707569"
  },
  {
    "usps": "VA",
    "county": "James City",
    "lat": "37.324837",
    "long": "-76.777888"
  },
  {
    "usps": "VA",
    "county": "King and Queen",
    "lat": "37.717772",
    "long": "-76.905581"
  },
  {
    "usps": "VA",
    "county": "King George",
    "lat": "38.27718",
    "long": "-77.162636"
  },
  {
    "usps": "VA",
    "county": "King William",
    "lat": "37.70826",
    "long": "-77.091054"
  },
  {
    "usps": "VA",
    "county": "Lancaster",
    "lat": "37.704843",
    "long": "-76.412663"
  },
  {
    "usps": "VA",
    "county": "Lee",
    "lat": "36.701721",
    "long": "-83.130112"
  },
  {
    "usps": "VA",
    "county": "Loudoun",
    "lat": "39.0812",
    "long": "-77.638898"
  },
  {
    "usps": "VA",
    "county": "Louisa",
    "lat": "37.972704",
    "long": "-77.959795"
  },
  {
    "usps": "VA",
    "county": "Lunenburg",
    "lat": "36.945555",
    "long": "-78.240528"
  },
  {
    "usps": "VA",
    "county": "Madison",
    "lat": "38.412059",
    "long": "-78.276961"
  },
  {
    "usps": "VA",
    "county": "Mathews",
    "lat": "37.425348",
    "long": "-76.268808"
  },
  {
    "usps": "VA",
    "county": "Mecklenburg",
    "lat": "36.687256",
    "long": "-78.368959"
  },
  {
    "usps": "VA",
    "county": "Middlesex",
    "lat": "37.606975",
    "long": "-76.528082"
  },
  {
    "usps": "VA",
    "county": "Montgomery",
    "lat": "37.175538",
    "long": "-80.387794"
  },
  {
    "usps": "VA",
    "county": "Nelson",
    "lat": "37.789079",
    "long": "-78.88344"
  },
  {
    "usps": "VA",
    "county": "New Kent",
    "lat": "37.51016",
    "long": "-76.999331"
  },
  {
    "usps": "VA",
    "county": "Northampton",
    "lat": "37.302775",
    "long": "-75.924018"
  },
  {
    "usps": "VA",
    "county": "Northumberland",
    "lat": "37.856974",
    "long": "-76.379687"
  },
  {
    "usps": "VA",
    "county": "Nottoway",
    "lat": "37.141167",
    "long": "-78.053866"
  },
  {
    "usps": "VA",
    "county": "Orange",
    "lat": "38.249326",
    "long": "-78.011092"
  },
  {
    "usps": "VA",
    "county": "Page",
    "lat": "38.623209",
    "long": "-78.491872"
  },
  {
    "usps": "VA",
    "county": "Patrick",
    "lat": "36.667138",
    "long": "-80.286413"
  },
  {
    "usps": "VA",
    "county": "Pittsylvania",
    "lat": "36.821721",
    "long": "-79.398502"
  },
  {
    "usps": "VA",
    "county": "Powhatan",
    "lat": "37.549404",
    "long": "-77.912855"
  },
  {
    "usps": "VA",
    "county": "Prince Edward",
    "lat": "37.224881",
    "long": "-78.432957"
  },
  {
    "usps": "VA",
    "county": "Prince George",
    "lat": "37.187325",
    "long": "-77.220993"
  },
  {
    "usps": "VA",
    "county": "Prince William",
    "lat": "38.701119",
    "long": "-77.479579"
  },
  {
    "usps": "VA",
    "county": "Pulaski",
    "lat": "37.063385",
    "long": "-80.713444"
  },
  {
    "usps": "VA",
    "county": "Rappahannock",
    "lat": "38.684522",
    "long": "-78.168824"
  },
  {
    "usps": "VA",
    "county": "Richmond",
    "lat": "37.942894",
    "long": "-76.730561"
  },
  {
    "usps": "VA",
    "county": "Roanoke",
    "lat": "37.330792",
    "long": "-80.191237"
  },
  {
    "usps": "VA",
    "county": "Rockbridge",
    "lat": "37.814517",
    "long": "-79.447754"
  },
  {
    "usps": "VA",
    "county": "Rockingham",
    "lat": "38.507585",
    "long": "-78.885321"
  },
  {
    "usps": "VA",
    "county": "Russell",
    "lat": "36.93342",
    "long": "-82.095934"
  },
  {
    "usps": "VA",
    "county": "Scott",
    "lat": "36.712776",
    "long": "-82.613624"
  },
  {
    "usps": "VA",
    "county": "Shenandoah",
    "lat": "38.856204",
    "long": "-78.573987"
  },
  {
    "usps": "VA",
    "county": "Smyth",
    "lat": "36.842318",
    "long": "-81.539786"
  },
  {
    "usps": "VA",
    "county": "Southampton",
    "lat": "36.720068",
    "long": "-77.103813"
  },
  {
    "usps": "VA",
    "county": "Spotsylvania",
    "lat": "38.182431",
    "long": "-77.657226"
  },
  {
    "usps": "VA",
    "county": "Stafford",
    "lat": "38.423084",
    "long": "-77.458048"
  },
  {
    "usps": "VA",
    "county": "Surry",
    "lat": "37.119761",
    "long": "-76.880172"
  },
  {
    "usps": "VA",
    "county": "Sussex",
    "lat": "36.926645",
    "long": "-77.259732"
  },
  {
    "usps": "VA",
    "county": "Tazewell",
    "lat": "37.125395",
    "long": "-81.562924"
  },
  {
    "usps": "VA",
    "county": "Warren",
    "lat": "38.908221",
    "long": "-78.207594"
  },
  {
    "usps": "VA",
    "county": "Washington",
    "lat": "36.747814",
    "long": "-81.950322"
  },
  {
    "usps": "VA",
    "county": "Westmoreland",
    "lat": "38.109311",
    "long": "-76.803933"
  },
  {
    "usps": "VA",
    "county": "Wise",
    "lat": "36.974561",
    "long": "-82.62156"
  },
  {
    "usps": "VA",
    "county": "Wythe",
    "lat": "36.899867",
    "long": "-81.083001"
  },
  {
    "usps": "VA",
    "county": "York",
    "lat": "37.220914",
    "long": "-76.395533"
  },
  {
    "usps": "VA",
    "county": "Alexandria",
    "lat": "38.819251",
    "long": "-77.08367"
  },
  {
    "usps": "VA",
    "county": "Bristol",
    "lat": "36.616954",
    "long": "-82.157564"
  },
  {
    "usps": "VA",
    "county": "Buena Vista",
    "lat": "37.729345",
    "long": "-79.358134"
  },
  {
    "usps": "VA",
    "county": "Charlottesville",
    "lat": "38.037658",
    "long": "-78.485381"
  },
  {
    "usps": "VA",
    "county": "Chesapeake",
    "lat": "36.679376",
    "long": "-76.301788"
  },
  {
    "usps": "VA",
    "county": "Colonial Heights",
    "lat": "37.261685",
    "long": "-77.396804"
  },
  {
    "usps": "VA",
    "county": "Covington",
    "lat": "37.78106",
    "long": "-79.985434"
  },
  {
    "usps": "VA",
    "county": "Danville",
    "lat": "36.583334",
    "long": "-79.408071"
  },
  {
    "usps": "VA",
    "county": "Emporia",
    "lat": "36.696182",
    "long": "-77.535975"
  },
  {
    "usps": "VA",
    "county": "Fairfax",
    "lat": "38.853183",
    "long": "-77.299025"
  },
  {
    "usps": "VA",
    "county": "Falls Church",
    "lat": "38.884722",
    "long": "-77.175603"
  },
  {
    "usps": "VA",
    "county": "Franklin",
    "lat": "36.684014",
    "long": "-76.941396"
  },
  {
    "usps": "VA",
    "county": "Fredericksburg",
    "lat": "38.299272",
    "long": "-77.486658"
  },
  {
    "usps": "VA",
    "county": "Galax",
    "lat": "36.66564",
    "long": "-80.914308"
  },
  {
    "usps": "VA",
    "county": "Hampton",
    "lat": "37.047961",
    "long": "-76.297293"
  },
  {
    "usps": "VA",
    "county": "Harrisonburg",
    "lat": "38.436255",
    "long": "-78.873303"
  },
  {
    "usps": "VA",
    "county": "Hopewell",
    "lat": "37.29101",
    "long": "-77.298944"
  },
  {
    "usps": "VA",
    "county": "Lexington",
    "lat": "37.782332",
    "long": "-79.44432"
  },
  {
    "usps": "VA",
    "county": "Lynchburg",
    "lat": "37.399016",
    "long": "-79.195458"
  },
  {
    "usps": "VA",
    "county": "Manassas",
    "lat": "38.746808",
    "long": "-77.482633"
  },
  {
    "usps": "VA",
    "county": "Manassas Park",
    "lat": "38.769398",
    "long": "-77.442323"
  },
  {
    "usps": "VA",
    "county": "Martinsville",
    "lat": "36.683527",
    "long": "-79.863647"
  },
  {
    "usps": "VA",
    "county": "Newport News",
    "lat": "37.076136",
    "long": "-76.52198"
  },
  {
    "usps": "VA",
    "county": "Norfolk",
    "lat": "36.923015",
    "long": "-76.244641"
  },
  {
    "usps": "VA",
    "county": "Norton",
    "lat": "36.931549",
    "long": "-82.625996"
  },
  {
    "usps": "VA",
    "county": "Petersburg",
    "lat": "37.20473",
    "long": "-77.392368"
  },
  {
    "usps": "VA",
    "county": "Poquoson",
    "lat": "37.12836",
    "long": "-76.303534"
  },
  {
    "usps": "VA",
    "county": "Portsmouth",
    "lat": "36.859339",
    "long": "-76.356973"
  },
  {
    "usps": "VA",
    "county": "Radford",
    "lat": "37.120119",
    "long": "-80.559147"
  },
  {
    "usps": "VA",
    "county": "Richmond",
    "lat": "37.531399",
    "long": "-77.476009"
  },
  {
    "usps": "VA",
    "county": "Roanoke",
    "lat": "37.278458",
    "long": "-79.958174"
  },
  {
    "usps": "VA",
    "county": "Salem",
    "lat": "37.285333",
    "long": "-80.055241"
  },
  {
    "usps": "VA",
    "county": "Staunton",
    "lat": "38.157978",
    "long": "-79.061876"
  },
  {
    "usps": "VA",
    "county": "Suffolk",
    "lat": "36.697157",
    "long": "-76.634781"
  },
  {
    "usps": "VA",
    "county": "Virginia Beach",
    "lat": "36.779525",
    "long": "-76.029142"
  },
  {
    "usps": "VA",
    "county": "Waynesboro",
    "lat": "38.067157",
    "long": "-78.90142"
  },
  {
    "usps": "VA",
    "county": "Williamsburg",
    "lat": "37.269481",
    "long": "-76.708193"
  },
  {
    "usps": "VA",
    "county": "Winchester",
    "lat": "39.173869",
    "long": "-78.176356"
  },
  {
    "usps": "WV",
    "county": "Barbour",
    "lat": "39.139725",
    "long": "-79.996947"
  },
  {
    "usps": "WV",
    "county": "Berkeley",
    "lat": "39.447938",
    "long": "-78.037754"
  },
  {
    "usps": "WV",
    "county": "Boone",
    "lat": "38.022814",
    "long": "-81.713538"
  },
  {
    "usps": "WV",
    "county": "Braxton",
    "lat": "38.69933",
    "long": "-80.73166"
  },
  {
    "usps": "WV",
    "county": "Brooke",
    "lat": "40.272645",
    "long": "-80.578691"
  },
  {
    "usps": "WV",
    "county": "Cabell",
    "lat": "38.419578",
    "long": "-82.243397"
  },
  {
    "usps": "WV",
    "county": "Calhoun",
    "lat": "38.844159",
    "long": "-81.115478"
  },
  {
    "usps": "WV",
    "county": "Clay",
    "lat": "38.459826",
    "long": "-81.081866"
  },
  {
    "usps": "WV",
    "county": "Doddridge",
    "lat": "39.264307",
    "long": "-80.711498"
  },
  {
    "usps": "WV",
    "county": "Fayette",
    "lat": "38.030933",
    "long": "-81.086051"
  },
  {
    "usps": "WV",
    "county": "Gilmer",
    "lat": "38.915867",
    "long": "-80.849413"
  },
  {
    "usps": "WV",
    "county": "Grant",
    "lat": "39.105988",
    "long": "-79.195064"
  },
  {
    "usps": "WV",
    "county": "Greenbrier",
    "lat": "37.924418",
    "long": "-80.45059"
  },
  {
    "usps": "WV",
    "county": "Hampshire",
    "lat": "39.312139",
    "long": "-78.611989"
  },
  {
    "usps": "WV",
    "county": "Hancock",
    "lat": "40.516958",
    "long": "-80.570164"
  },
  {
    "usps": "WV",
    "county": "Hardy",
    "lat": "39.011361",
    "long": "-78.841729"
  },
  {
    "usps": "WV",
    "county": "Harrison",
    "lat": "39.279182",
    "long": "-80.386498"
  },
  {
    "usps": "WV",
    "county": "Jackson",
    "lat": "38.834234",
    "long": "-81.677717"
  },
  {
    "usps": "WV",
    "county": "Jefferson",
    "lat": "39.307398",
    "long": "-77.86322"
  },
  {
    "usps": "WV",
    "county": "Kanawha",
    "lat": "38.328068",
    "long": "-81.523516"
  },
  {
    "usps": "WV",
    "county": "Lewis",
    "lat": "38.988877",
    "long": "-80.495477"
  },
  {
    "usps": "WV",
    "county": "Lincoln",
    "lat": "38.17177",
    "long": "-82.077623"
  },
  {
    "usps": "WV",
    "county": "Logan",
    "lat": "37.830591",
    "long": "-81.940853"
  },
  {
    "usps": "WV",
    "county": "McDowell",
    "lat": "37.38276",
    "long": "-81.658204"
  },
  {
    "usps": "WV",
    "county": "Marion",
    "lat": "39.505839",
    "long": "-80.243402"
  },
  {
    "usps": "WV",
    "county": "Marshall",
    "lat": "39.854426",
    "long": "-80.671794"
  },
  {
    "usps": "WV",
    "county": "Mason",
    "lat": "38.770914",
    "long": "-82.029007"
  },
  {
    "usps": "WV",
    "county": "Mercer",
    "lat": "37.403448",
    "long": "-81.106456"
  },
  {
    "usps": "WV",
    "county": "Mineral",
    "lat": "39.404781",
    "long": "-78.95669"
  },
  {
    "usps": "WV",
    "county": "Mingo",
    "lat": "37.721161",
    "long": "-82.158989"
  },
  {
    "usps": "WV",
    "county": "Monongalia",
    "lat": "39.633645",
    "long": "-80.059074"
  },
  {
    "usps": "WV",
    "county": "Monroe",
    "lat": "37.554062",
    "long": "-80.550329"
  },
  {
    "usps": "WV",
    "county": "Morgan",
    "lat": "39.557345",
    "long": "-78.256517"
  },
  {
    "usps": "WV",
    "county": "Nicholas",
    "lat": "38.291432",
    "long": "-80.797515"
  },
  {
    "usps": "WV",
    "county": "Ohio",
    "lat": "40.100323",
    "long": "-80.6199"
  },
  {
    "usps": "WV",
    "county": "Pendleton",
    "lat": "38.67445",
    "long": "-79.340617"
  },
  {
    "usps": "WV",
    "county": "Pleasants",
    "lat": "39.368133",
    "long": "-81.161172"
  },
  {
    "usps": "WV",
    "county": "Pocahontas",
    "lat": "38.332606",
    "long": "-80.010121"
  },
  {
    "usps": "WV",
    "county": "Preston",
    "lat": "39.46903",
    "long": "-79.668865"
  },
  {
    "usps": "WV",
    "county": "Putnam",
    "lat": "38.510518",
    "long": "-81.906109"
  },
  {
    "usps": "WV",
    "county": "Raleigh",
    "lat": "37.762469",
    "long": "-81.264672"
  },
  {
    "usps": "WV",
    "county": "Randolph",
    "lat": "38.781095",
    "long": "-79.867788"
  },
  {
    "usps": "WV",
    "county": "Ritchie",
    "lat": "39.177112",
    "long": "-81.066317"
  },
  {
    "usps": "WV",
    "county": "Roane",
    "lat": "38.74295",
    "long": "-81.354494"
  },
  {
    "usps": "WV",
    "county": "Summers",
    "lat": "37.655999",
    "long": "-80.856325"
  },
  {
    "usps": "WV",
    "county": "Taylor",
    "lat": "39.332478",
    "long": "-80.046554"
  },
  {
    "usps": "WV",
    "county": "Tucker",
    "lat": "39.111175",
    "long": "-79.559968"
  },
  {
    "usps": "WV",
    "county": "Tyler",
    "lat": "39.465634",
    "long": "-80.877219"
  },
  {
    "usps": "WV",
    "county": "Upshur",
    "lat": "38.90253",
    "long": "-80.231606"
  },
  {
    "usps": "WV",
    "county": "Wayne",
    "lat": "38.143642",
    "long": "-82.422666"
  },
  {
    "usps": "WV",
    "county": "Webster",
    "lat": "38.483459",
    "long": "-80.449052"
  },
  {
    "usps": "WV",
    "county": "Wetzel",
    "lat": "39.59818",
    "long": "-80.635399"
  },
  {
    "usps": "WV",
    "county": "Wirt",
    "lat": "39.020034",
    "long": "-81.382975"
  },
  {
    "usps": "WV",
    "county": "Wood",
    "lat": "39.211602",
    "long": "-81.516234"
  },
  {
    "usps": "WV",
    "county": "Wyoming",
    "lat": "37.60366",
    "long": "-81.549032"
  }
]