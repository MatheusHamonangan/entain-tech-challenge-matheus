import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import RaceList from '../RaceList';
import sortRace from '../../helpers/sortRaceAsc'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface IRaceSummary {
  [propertyName: string]: {
    category_id: string,
    advertised_start: {
      seconds: number
    }
  };
}

function isEmpty<Boolean>(obj: Object) {
  return Object.keys(obj).length === 0;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
              <Box p={3}>
                  <Typography>{children}</Typography>
              </Box>
          )}
      </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [raceSummaries, setData] = useState<IRaceSummary>({});

  useEffect(() => {
      async function fetchData() {
          const response = await axios('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10');
          setData(response.data.data.race_summaries)
      }
      fetchData()
      const interval = setInterval(() => fetchData(), 60000)
      return () => {
        clearInterval(interval);
      }
  }, [])

  let sortedGreyhound:Array<Object> =[]
  let sortedHarness:Array<Object> =[]
  let sortedHorse:Array<Object> =[]

  if (!isEmpty(raceSummaries)) {
    const raceEntries = Object.values(raceSummaries);
    const greyhound = raceEntries.filter(v => v.category_id === '9daef0d7-bf3c-4f50-921d-8e818c60fe61' && v.advertised_start.seconds > Date.now() / 1000)
    const harness = raceEntries.filter((v) => v.category_id === '161d9be2-e909-4326-8c2c-35ed71fb460b' && v.advertised_start.seconds > Date.now() / 1000);
    const horse = raceEntries.filter((v) => v.category_id === '4a2788f8-e825-4d36-9894-efd4baf1cfae' && v.advertised_start.seconds > Date.now() / 1000);

    sortedGreyhound = sortRace(greyhound)
    sortedHarness = sortRace(harness)
    sortedHorse = sortRace(horse)
  }


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Greyhound" />
          <Tab label="Harness" />
          <Tab label="Horse" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RaceList list={sortedGreyhound} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RaceList list={sortedHarness} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RaceList list={sortedHorse} />
      </TabPanel>
    </div>
  );
}
