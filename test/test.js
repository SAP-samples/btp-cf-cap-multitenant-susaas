const cds = require('@sap/cds/lib')
const { expect, GET } = cds.test(process.env.PWD,"--profile","local-with-mtx")


describe('Multitenancy is up and running', () => {
  it('Subscribe for tenant t1', async () => {
    var { 'cds.xt.DeploymentService': ds } = cds.services
    await ds.subscribe("t1");
  })
})


describe('Service Test', () => {
  it('Admin and Catalog Service service served successfully', () => {
    const { AdminService } = cds.services;
    const { CatalogService } = cds.services;
  })
})

describe('Entity Consistency Test', () => {
  it('Projects entity is consistent', async () => {
    const CatalogService = await cds.connect.to('CatalogService')
    cds.context = { user: new cds.User.Privileged,tenant:"t1" }
    let projects = await CatalogService.read("Projects")
    expect(projects).to.containSubset([{ "ID": "d419b9d9-897e-4e1f-9a7d-6a16e3c8f776" },
                                       { "ID": "10cb1ac9-bc9c-408b-b44d-e2ea1d5c353d" },
                                       { "ID": "c5d24ecb-8b18-459f-be21-4e7d5727fb56" }]);
  })
  it('Products entity is consistent', async () => {
    const CatalogService = await cds.connect.to('CatalogService')
    cds.context = { user: new cds.User.Privileged,tenant:"t1" }
    let products = await CatalogService.read("Products")
    expect(products).to.containSubset([{ "ID": "HT-1000" },
                                       { "ID": "HT-1001" },
                                       { "ID": "HT-1002" }]);
  })
  it('Material Splits entity is consistent', async () => {
    const CatalogService = await cds.connect.to('CatalogService')
    cds.context = { user: new cds.User.Privileged,tenant:"t1" }
    let products = await CatalogService.read("MaterialSplits")
    expect(products).to.containSubset([{ "ID": "c41984c9-707c-4c44-a647-2bd4e9a0c1f8" }]);
  })
})
