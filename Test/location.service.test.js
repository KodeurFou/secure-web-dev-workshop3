const locationsServices = require("../locations/locations.service")
const location = require("../locations/locations.model")

jest.mock("../locations/locations.model")


describe('Location FindAll', () => {
    it('should call model find', async() => {
        location.find({}).mockResolvedValue
        expect (await locationsServices.findAll()).toEqual([1,2,3,4])
        expect(location.find).toHaveBeenCalledTimes(1)
    })
})


describe('Location FindOne', () => {
    it('Should get a location', async() => {
        const mockLocation = {
            _id: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' ,filename: 'Test film'
        }
        location.findById.mockResolvedValue(mockLocation)

        expect(await locationsServices.FindOne('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')).toEqual(mockLocation)
        expect(location.findById).toHaveBeenCalledTimes(1)
    })
})
