import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {getCountries, trackAPI, getNews} from './ApiLinks';

export default function HomeScreen({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [trackedData, setTrackedData] = useState();
  const [selectedCountry, setSelectedCountry] = useState({});
  const [newsData, setNewsData] = useState({});
  const [countries, setCountries] = useState([]);
  async function getCountriesAPI() {
    let countries = await getCountries();
    let countryArr = [];
    countries.map(val => {
      countryArr.push({
        label: val.name,
        value: val.alpha2Code,
        flag: val.flag,
      });
    });
    setCountries(countryArr);
    return;
  }

  function formatDate(date) {
    let fullDate = new Date(date);
    let day;
    let month;
    let year;
    day = fullDate.getDate();
    month = fullDate.getMonth() + 1;
    year = fullDate.getFullYear();
    return year + '-' + month + '-' + day;
  }

  async function getNumbersAPI(country, from, to) {
    let currentDate = new Date(new Date());

    let fromFormatted = formatDate(from);
    let toFormatted =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();

    let tracker = await trackAPI(country, fromFormatted, toFormatted);
    setTrackedData();
    setTrackedData(tracker);
    return;
  }

  async function getNewsAPI(countryCode) {
    let news = await getNews(countryCode);
    setNewsData(news);
    return;
  }

  useEffect(() => {
    getCountriesAPI();
  }, []);
  useEffect(() => {
    if (value && dateFrom && countries) {
      const found = countries.find(element => element.value == value);
      setSelectedCountry(found);
      getNumbersAPI(found.label, dateFrom, new Date());
      getNewsAPI(found.value);
    }
  }, [value, dateFrom, countries]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <DropDownPicker
        style={{width: '80%', alignSelf: 'center'}}
        containerStyle={{width: '70%', height: '20%'}}
        maxHeight={170}
        open={open}
        value={value}
        items={countries}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setCountries}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '30%',
        }}>
        <View>
          <Text>From</Text>
          <DatePicker
            mode={'date'}
            date={dateFrom}
            style={{height: 75}}
            maximumDate={new Date()}
            onDateChange={setDateFrom}
          />
        </View>
      </View>
      <ScrollView
        style={{
          width: '90%',
          flexGrow: 0.6,
          backgroundColor: '#d3d3d3',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'red'}}>
            TOTAL CONFIRMED : {trackedData?.total?.today_confirmed}
          </Text>
          <Text style={{color: 'red'}}>
            TOTAL DEATHS : {trackedData?.total?.today_deaths}
          </Text>
          <Text style={{color: 'red'}}>
            TOTAL RECOVERED : {trackedData?.total?.today_new_recovered}
          </Text>
        </View>
        {selectedCountry?.label && newsData?.articles?.length > 0 && (
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 100,
              marginTop: 40,
              borderRadius: 5,
            }}
            onPress={() =>
              navigation.navigate('News', {
                data: newsData,
                flag: selectedCountry.flag,
              })
            }>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {selectedCountry?.label + ' News'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
