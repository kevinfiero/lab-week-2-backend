require('dotenv').config();
const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      // const signInData = fakeRequest(app)
      //   .post('/auth/signup')
      //   .send({
      //     email: 'jon@user.com',
      //     password: '1234'
      //   });
      
      // token = signInData.body.token;
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    const coffeeArray = [
      {
        id: 1,
        name_id: 'french-roast-12oz',
        name: 'French Roast',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1695/large/media.nl?1524324908',
        description: '12oz French Roast',
        category: 'Organic',
        price: 16,
        on_sale: false,
        supplier : 'Stumptown - West'
    },
    {
        id: 2,
        name_id: 'hair-bender-12oz',
        name: 'Hair Bender',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1692/large/media.nl?1524324843',
        description: '12oz Hair Bender',
        category: 'Organic',
        price: 15,
        on_sale: true,
        supplier : 'Stumptown - West'
    },
    {
        id: 3,
        name_id: 'holler-mountatin-12oz',
        name: 'Holler Mountain',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1691/large/media.nl?1524324733',
        description: '12oz Holler Mountain',
        category: 'Organic',
        price: 16,
        on_sale: true,
        supplier : 'Stumptown - West'
    },
    {
        id: 4,
        name_id: 'house-blend-12oz',
        name: 'House Blend',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1740/large/media.nl?1532727765',
        description: '12oz House Blend',
        category: 'Organic',
        price: 15,
        on_sale: true,
        supplier : 'Stumptown - West'
    },
    {
        id: 5,
        name_id: 'trapper-creek-12oz',
        name: 'Trapper Creek',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1687/large/media.nl?1524324582',
        description: '12oz Trapper Creek',
        category: 'Organic',
        price: 16,
        on_sale: false,
        supplier : 'Stumptown - West'
    },
    {
        id: 6,
        name_id: 'el-puente-12oz',
        name: 'Honduras El Puente',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1912/large/puente_sm.png?1591641424',
        description: '12oz Honduras El Puente',
        category: 'Single Origin Organic',
        price: 20,
        on_sale: true,
        supplier : 'Stumptown - East'
    },
    {
        id: 7,
        name_id: 'el-injerto-bourbon-12oz',
        name: 'Guatemala El Injerto Bourbon',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1908/large/InjertoBourbon_2020.png?1590612462',
        description: '12oz Guatemala El Injerto Bourbon',
        category: 'Single Origin Organic',
        price: 20,
        on_sale: true,
        supplier : 'Stumptown - East'
    },
    {
        id: 8,
        name_id: 'montes-de-oro-12oz',
        name: 'Costa Rica Montes De Oro',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1901/large/MontesDeOro_2020.png?1590700066',
        description: '12oz Costa Rica Montes De Oro',
        category: 'Single Origin Organic',
        price: 22,
        on_sale: false,
        supplier : 'Stumptown - East'
    },
    {
        id: 9,
        name_id: 'bies-penantan-12oz',
        name: 'Indonesia Bies Penatan',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1913/large/Indo_Bies2020.png?1586194787',
        description: '12oz Indonesia Bies Penatan',
        category: 'Single Origin Organic',
        price: 19,
        on_sale: true,
        supplier : 'Stumptown - East'
    },
    {
        id: 10,
        name_id: 'ndaroini-12oz',
        name: 'Kenya Ndaroini',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1985/large/media.nl?1600101766',
        description: '12oz Kenya Ndaroini',
        category: 'Single Origin Organic',
        price: 19,
        on_sale: false,
        supplier : 'Stumptown - East'
    },
    {
      
        id: 11,
        name_id: 'mordecofe-12oz',
        name: 'Ethiopia Mordecofe',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1949/large/Mordecofe2020sm.png?1595862297',
        description: '12oz Ethiopia Mordecofe',
        category: 'Single Origin Organic',
        price: 20,
        on_sale: true,
        supplier : 'Stumptown - East'
    }
    ];

  test('returns coffees', async() => {

    const expectation = coffeeArray;
    const data = await fakeRequest(app)
      .get('/coffees')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test('returns single coffee by ID', async() => {
    const expectation = {
      id: 2,
      name_id: 'hair-bender-12oz',
      name: 'Hair Bender',
      image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1692/large/media.nl?1524324843',
      description: '12oz Hair Bender',
      category: 'Organic',
      price: 15,
      on_sale: true,
      supplier: 'Stumptown - West'
    };

    const data = await fakeRequest(app)
    
      .get('/coffees/2')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test('returns suppliers', async() => {
    const expectation = [{
      id: 1,
      supplier: 'Stumptown - West'
    },
    {
      id: 2,
      supplier: 'Stumptown - East'
    }];

    const data = await fakeRequest(app)
    
      .get('/suppliers')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test('add single coffee', async() => {
    const expectation = {
      id: 12,
      name_id: 'bella-vista-12oz',
      name: 'Bella Vista',
      image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1987/large/media.nl?1600103615',
      description: '12oz Bella Vista',
      category: 'Organic',
      price: 20,
      on_sale: false,
      supplier_id: 1
    };

    const data = await fakeRequest(app)
      .post('/coffees')
      .send({
        name_id: 'bella-vista-12oz',
        name: 'Bella Vista',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1987/large/media.nl?1600103615',
        description: '12oz Bella Vista',
        category: 'Organic',
        price: 20,
        on_sale: false,
        supplier_id: 1
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const allCoffees = await fakeRequest(app)
      .get('/coffees')
      .expect('Content-Type', /json/)
      .expect(200);


    expect(data.body).toEqual(expectation);
    expect(allCoffees.body.length).toEqual(12);
  });

  test('alter single coffee', async() => {
    const expectation = {
      id: 12,
      name_id: 'bella-vista-extreme-12oz',
      name: 'Bella Vista Extreme',
      image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1987/large/media.nl?1600103615',
      description: '12oz Bella Vista Extreme',
      category: 'Organic',
      price: 12,
      on_sale: true,
      supplier_id: 1
    };

    const data = await fakeRequest(app)
      .put('/coffees/12')
      .send({
        name_id: 'bella-vista-extreme-12oz',
        name: 'Bella Vista Extreme',
        image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1987/large/media.nl?1600103615',
        description: '12oz Bella Vista Extreme',
        category: 'Organic',
        price: 12,
        on_sale: true,
        supplier_id: 1
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  test('delete single coffee', async() => {
    const expectation = {
      id: 12,
      name_id: 'bella-vista-extreme-12oz',
      name: 'Bella Vista Extreme',
      image: 'https://d1rusy4hxccwbq.cloudfront.net/spree/images/1987/large/media.nl?1600103615',
      description: '12oz Bella Vista Extreme',
      category: 'Organic',
      price: 12,
      on_sale: true,
      supplier_id: 1
    };

    const data = await fakeRequest(app)
      .delete('/coffees/12')
      .expect('Content-Type', /json/)
      .expect(200);

    const allCoffees = await fakeRequest(app)
    .get('/coffees')
    .expect('Content-Type', /json/)
    .expect(200);


    expect(data.body).toEqual(expectation);
    expect(allCoffees.body.length).toEqual(11);
  });



});
});
