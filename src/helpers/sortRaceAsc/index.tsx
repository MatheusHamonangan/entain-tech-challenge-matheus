/**
 * This function sorts the race list asc based on the
 * advertised_date attribute
 */
const sortRaceAsc = (values: any): Array<Object> => {
    return values.sort(function (a: {
        advertised_start: {seconds: number}
      }, b: {
      advertised_start: {seconds: number}
    }): number {
      return a.advertised_start.seconds - b.advertised_start.seconds
    })
  }

  export default sortRaceAsc