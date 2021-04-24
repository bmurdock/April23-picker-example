import React from 'react';
import { ScrollView, StyleSheet, Text, View, Picker } from 'react-native';
const NEWSAPIKEY = "67752668abc440628948a2c544e6cfb9";

export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {
      articles: [],
      sources: [],
      selectedSource: '',
      sourceItems: [],
    };
  }

  componentDidMount()
  {
    const articlesRoute = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWSAPIKEY}`;
    const sourcesRoute = `https://newsapi.org/v2/sources?apiKey=${NEWSAPIKEY}`;

    const promises = [];

    promises.push(fetch(articlesRoute));
    promises.push(fetch(sourcesRoute));

    Promise.all(promises)
    .then((results) =>
    {
      // create an array of promises that return json from the responses
      const resultsPromises = results.map((response) =>
      {
        return response.json();
      });

      Promise.all(resultsPromises)
      .then((data) =>
      {
        // at this point data is an array
        const stateObj = {
          articles: [],
          sources: [],
        };

        for (let i = 0; i < data.length; i++)
        {
          const keysToCheck = ['sources', 'articles'];
          keysToCheck.forEach((key) =>
          {
            if (data[i][key])
            {
              stateObj[key] = data[i][key];
              if (key === 'sources')
              {
                stateObj.sourceItems = data[i][key].map((source, index) =>
                {
                  return <Picker.Item key={`source_${source.id}`} label={source.name} value={source.id} />
                });
              }
            }
          });
        }

        this.setState(stateObj);
      })
      .catch((err) =>
      {
        console.log('catching errors: ', err);
      });
    })
    .catch((err) =>
    {
      console.log('Error with one or more promises: ', err);
    })

  }

  pickerSelection = (id) =>
  {
    console.log('user selected: ', id);
    // we need the source to do something with later maybe?
    const source = this.findSource(id);
    console.log('source:', source);
    this.setState(
      {
        selectedSource: id,
      }
    )
  }

  findSource = (id) =>
  {
    console.log('Looking for:', id);
    const source = this.state.sources.filter((source) =>
    {
      return source.id === id;
    });
    return source[0];
  }


  render()
  {
    return(
      <ScrollView>
        <Text>Whatever</Text>
        <Picker
          selectedValue={this.state.selectedSource}
          onValueChange={this.pickerSelection}
        >
          <Picker.Item label="Choose a Source" />
          {this.state.sourceItems}
        </Picker>
      </ScrollView>
    )
  }
}