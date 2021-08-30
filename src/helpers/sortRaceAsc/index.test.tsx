import sortRaceAsc from './';
import raceListMock from './__mock__/raceList.json'
import sortedListMock from './__mock__/sortedRaceList.json'

const raceList = raceListMock.data
const expectedResult =  sortedListMock.data

it("should order the race ASC based on advertised_start", () => {
    const result = sortRaceAsc(raceList);

    expect(result).toEqual(expectedResult)
})