const kitchen = [
    {
        id: 1,
        name: 'Сердечка',
        description:
            'Ніжні та романтичні, містять в собі кілька відтінків неба, підставки "Сердечка" - в наявності. В наборі - три сердечка (блакитне, сіре, та сіро-блакитного відтінку). Матеріали: акрил (пряжа).',
        dimensions: 'Розміри: 14/12см.',
        amount: 'Ціна за набір з трьох штук.',
        images: [
            'serdtsya_01.jpg',
            'serdtsya_02.jpg',
            'serdtsya_03.jpg',
            'serdtsya_04.jpg',
            'serdtsya_05.jpg',
            'serdtsya_06.jpg',
            'serdtsya_07.jpg',
        ],
        price: 80,
        link: 'serdechka',
        category: 'Для кухні',
    },
    {
        id: 2,
        name: 'Закохані котики',
        description:
            'Таких підставочок - всього дві в наявності. Тож варто поспішити з придбанням ;) Матеріали: акрил (пряжа), бавовна (підкладка).',
        dimensions: 'Розміри: 16/13см.',
        amount: 'Ціна за штуку.',
        images: ['zakohani_kotyky_01.jpg', 'zakohani_kotyky_02.jpg', 'zakohani_kotyky_03.jpg'],
        price: 50,
        link: 'zakokhani_kotyky',
        category: 'Для кухні',
        similar: [
            {
                img: 'chervoni_fakturni_01.jpg',
                price: 50,
                link: 'chervona_faktura',
            },
        ],
    },
    {
        id: 4,
        name: 'Червона фактура',
        description:
            'Всього дві в наявності! Червоні, фатурні та досить великого розміру підставочки під горнятка - до вашої уваги. Орнамент на виробі створено виключно за рахунок чергування різних петельок в процесі плетіння. Є підставочка з силуетом руки та сонечка. Зі зворотнього боку - бавовняна підкладка з квітковим орнаментом.',
        dimensions: 'Розміри: 18/15см.',
        amount: 'Ціна за штуку.',
        images: [
            'chervoni_fakturni_01.jpg',
            'chervoni_fakturni_02.jpg',
            'chervoni_fakturni_03.jpg',
            'chervoni_fakturni_04.jpg',
            'chervoni_fakturni_05.jpg',
            'chervoni_fakturni_06.jpg',
        ],
        price: 50,
        link: 'chervona_faktura',
        category: 'Для кухні',
        similar: [
            {
                img: 'zakohani_kotyky_01.jpg',
                price: 50,
                link: 'zakokhani_kotyky',
            },
        ],
    },
    {
        id: 5,
        name: 'Кольорові смайлики',
        description: 'Мінімалістичні та усміхнені - підставочки "Смайлики". Можна придбати поштучно або разом.',
        dimensions: 'Діаметр 11см.',
        amount: 'Ціна за штуку.',
        images: [
            'kolyorovi_smailyky_02.jpg',
            'kolyorovi_smailyky_01.jpg',
            'kolyorovi_smailyky_03.jpg',
            'kolyorovi_smailyky_04.jpg',
            'kolyorovi_smailyky_05.jpg',
            'kolyorovi_smailyky_06.jpg',
            'kolyorovi_smailyky_07.jpg',
        ],
        price: 35,
        link: 'koliorovi_smailyky',
        category: 'Для кухні',
        similar: [
            {
                img: 'yabluka_01.jpg',
                price: 35,
                link: 'yabluka',
            },
            {
                img: 'siri_smailyky_01.jpg',
                price: 35,
                link: 'siri_smailyky',
            },
        ],
    },
    {
        id: 6,
        name: 'Сірі смайлики',
        description: 'Підставки під горнятка "Сірі смайлики" плетені гачком, мають вишиті личка.',
        dimensions: 'Діаметр 11см.',
        amount: 'Ціна за штуку.',
        images: [
            'siri_smailyky_01.jpg',
            'siri_smailyky_02.jpg',
            'siri_smailyky_03.jpg',
            'siri_smailyky_04.jpg',
            'siri_smailyky_05.jpg',
        ],
        price: 35,
        link: 'siri_smailyky',
        category: 'Для кухні',
        similar: [
            {
                img: 'yabluka_01.jpg',
                price: 35,
                link: 'yabluka',
            },
            {
                img: 'kolyorovi_smailyky_02.jpg',
                price: 35,
                link: 'koliorovi_smailyky',
            },
        ],
    },
    {
        id: 7,
        name: 'Яблука',
        description:
            'Підставки "Яблука" плетені гачком з різних відтінків пастельної акрилової пряжі. Фактурні мінімалістичні та пасуватимуть до різного посуду.',
        dimensions: 'Діаметр 11см.',
        amount: 'Ціна за штуку.',
        images: [
            'yabluka_01.jpg',
            'yabluka_02.jpg',
            'yabluka_03.jpg',
            'yabluka_04.jpg',
            'yabluka_05.jpg',
            'yabluka_06.jpg',
        ],
        price: 35,
        link: 'yabluka',
        category: 'Для кухні',
        similar: [
            {
                img: 'kolyorovi_smailyky_02.jpg',
                price: 35,
                link: 'koliorovi_smailyky',
            },
            {
                img: 'siri_smailyky_01.jpg',
                price: 35,
                link: 'siri_smailyky',
            },
        ],
    },
    {
        id: 8,
        name: 'Бірюзові котики',
        description:
            'Набір підставочок під горнята "Бірюзові котики", готовий прикрашати ваше чаювання чи кавування. Плетені гачком та вишиті вручну підставки - чудовий подарунок для любителів_ок сімейства котячих. До набору входять шість підставочок.',
        dimensions: 'Діаметр 11.5см.',
        amount: 'Ціна за набір з 6 шт.',
        images: [
            'biriuzovi-kotyky-01.jpg',
            'biriuzovi-kotyky-02.jpg',
            'biriuzovi-kotyky-03.jpg',
            'biriuzovi-kotyky-04.jpg',
            'biriuzovi-kotyky-05.jpg',
            'biriuzovi-kotyky-06.jpg',
        ],
        price: 250,
        link: 'biriuzovi-kotyky',
        category: 'Для кухні',
        similar: [
            {
                img: 'kotyky-buzkovi-01.jpg',
                price: 250,
                link: 'kotyky-buzkovi',
            },
        ],
    },
    {
        id: 10,
        name: 'Бузкові котики',
        description:
            'Набір підставочок під горнята "Бузкові котики", готовий прикрашати ваше чаювання чи кавування. Плетені гачком та вишиті вручну підставки - чудовий подарунок для любителів_ок сімейства котячих. До набору входять шість підставочок.',
        dimensions: 'Діаметр 11.5см.',
        amount: 'Ціна за набір з 6 шт.',
        images: [
            'kotyky-buzkovi-01.jpg',
            'kotyky-buzkovi-02.jpg',
            'kotyky-buzkovi-03.jpg',
            'kotyky-buzkovi-04.jpg',
            'kotyky-buzkovi-05.jpg',
            'kotyky-buzkovi-06.jpg',
        ],
        price: 250,
        link: 'kotyky-buzkovi',
        category: 'Для кухні',
        similar: [
            {
                img: 'biriuzovi-kotyky-01.jpg',
                price: 250,
                link: 'biriuzovi-kotyky',
            },
        ],
    },
    {
        id: 12,
        name: 'Кактуси з рожевими квіточками',
        description:
            'Підставки під гаряче "Кактуси з рожевими квіточками" - плетені гачком, мають вишиті "голочки", кольорові, яскраві, та геть не колючі.',
        dimensions: 'Діаметр 11см.',
        amount: 'Ціна за набір з 6 шт.',
        images: [
            'kaktusy-rozhevi-kvity-01.jpg',
            'kaktusy-rozhevi-kvity-02.jpg',
            'kaktusy-rozhevi-kvity-03.jpg',
            'kaktusy-rozhevi-kvity-04.jpg',
            'kaktusy-rozhevi-kvity-05.jpg',
        ],
        price: 300,
        link: 'kaktusy-rozhevi-kvity',
        category: 'Для кухні',
        similar: [
            {
                img: 'kaktusy-zhovti-kvity-01.jpg',
                price: 300,
                link: 'kaktusy-zhovti-kvity',
            },
        ],
    },
    {
        id: 13,
        name: 'Кактуси з жовтими квіточками',
        description:
            'Підставки під гаряче "Кактуси з жовтими квіточками" - плетені гачком, мають вишиті "голочки", кольорові, яскраві, та геть не колючі.',
        dimensions: 'Діаметр 11см.',
        amount: 'Ціна за набір з 6 шт.',
        images: [
            'kaktusy-zhovti-kvity-01.jpg',
            'kaktusy-zhovti-kvity-02.jpg',
            'kaktusy-zhovti-kvity-03.jpg',
            'kaktusy-zhovti-kvity-04.jpg',
        ],
        price: 300,
        link: 'kaktusy-zhovti-kvity',
        category: 'Для кухні',
        similar: [
            {
                img: 'kaktusy-rozhevi-kvity-01.jpg',
                price: 300,
                link: 'kaktusy-rozhevi-kvity',
            },
        ],
    },
]

export default kitchen
