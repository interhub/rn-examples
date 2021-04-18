# How to use React Navigation Shared Element v5

## Install

Run:

```sh
npm i react-navigation-shared-element@next react-native-shared-element
npm i @react-navigation/native@^5.0.9 @react-navigation/stack@^5.1.1
```

## Usage

### Navigation Container

The top-most view in your App must have a `NavigationContainer`. In my case, that's `App.js`:

```js
const Stack = createStackNavigator();

export default class App extends React.PureComponent {
  // ...
  render() {
  if (this.state.showSplash) {
  return <Initializing />;
  } else {
    return (
      <NavigationContainer>
    <Stack.Navigator
     screenOptions={{gestureEnabled: false}}
        headerMode="none"
          initialRouteName="Initializing">
          {this.state.isSignedIn && (
            <Stack.Screen name="Home" component={Home} />
          )}
          {!this.state.isSignedIn && (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
```

### Navigator

Create the Shared Element Stack Navigator, in my case that's in `Home.js`:

```js
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
// ...
// This Spec makes it so that the animation goes from 1000ms (very slow) to 500ms (acceptable) speed! You can also remove it if you want.
export const iosTransitionSpec = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};
// ...
const SharedElementStack = createSharedElementStackNavigator();
function HomeSharedElementStackNavigator() {
  return (
    <SharedElementStack.Navigator
      mode="modal"
      screenOptions={{
        useNativeDriver: true,
        // Enable gestures if you want. I disabled them because of my card style interpolator opacity animation
        gestureEnabled: false,
        // gestureResponseDistance: {
        // 	vertical: 100,
        // },
        // gestureDirection: 'vertical',
        ...TransitionPresets.ModalSlideFromBottomIOS,
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
        // Opacity animation, you can also adjust this by playing with transform properties.
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
      headerMode="none"
    >
      <SharedElementStack.Screen name="HomeGridScreen" component={HomeGridScreen} />
      <SharedElementStack.Screen
        name="ItemDetailsScreen"
        component={ItemDetailsScreen}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { item } = route.params;
          if (route.name === "ItemDetailsScreen" && showing) {
            // Open animation fades in image, title and description
            return [
              {
                id: `item.${item.id}.image`,
              },
              {
                id: `item.${item.id}.title`,
                animation: "fade",
                resize: "clip",
                align: "left-top",
              },
              {
                id: `item.${item.id}.description`,
                animation: "fade",
                resize: "clip",
                align: "left-top",
              },
            ];
          } else {
            // Close animation only fades out image
            return [
              {
                id: `item.${item.id}.image`,
              },
            ];
          }
        }}
      />
    </SharedElementStack.Navigator>
  );
}
```

See those weird IDs we used? We need to define those in the `<SharedElement>`s now.

### Shared Elements

In my case, I have a `<FlatList>` layout of individual Items, one Item view may look like this:

```js
<View style={styles.item}>
  {this.state.hasThumbnail && (
    <SharedElement id={`item.${item.id}.image`}>
      {/* I used a <FastImage>, but I think every component works.
      Just make sure the SharedElement Tag exactly wraps the component
      you're rying to scale up or fade in, so no <View>s or other
      containers are in the <SharedElement> tag */}
      <FastImage
        source={{
          uri: item.thumbnail,
          cache: FastImage.cacheControl.immutable,
        }}
      />
    </SharedElement>
  )}
  {!this.state.hasThumbnail && (
    <SharedElement id={`item.${item.id}.image`}>
      {/* Here I use an item for example */}
      <Icon name="image-off" size={24} />
    </SharedElement>
  )}
  {/* ... */}
  {/* There's some Text */}
  <SharedElement id={`item.${item.id}.title`}>
    <Text>{item.title}</Text>
  </SharedElement>
  <SharedElement id={`item.${item.id}.description`}>
    <Text>{item.description}</Text>
  </SharedElement>
</View>
```

When the user presses this Item, I just call

```js
this.props.navigation.navigate("ItemDetailsScreen");
```

which looks like this:

```js
<View style={styles.itemDetails}>
  {/* Note that you have to use the same ID so the navigator knows to animate this item */}
  <SharedElement id={`item.${item.id}.image`}>
    <FastImage
      source={{
        uri: this.state.thumbnail,
        cache: FastImage.cacheControl.immutable,
      }}
    />
  </SharedElement>
  {/* ... */}
  {/* Again, the text. */}
  <SharedElement id={`item.${item.id}.title`}>
    <Text>{item.title}</Text>
  </SharedElement>
  <SharedElement id={`item.${item.id}.description`}>
    <Text>{item.description}</Text>
  </SharedElement>
<View>
```

<a href='https://ko-fi.com/F1F8CLXG' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi2.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Sources
* [GitHub: IjzerenHein/react-navigation-shared-element (v5 branch)](https://github.com/IjzerenHein/react-navigation-shared-element/blob/navigation-v5/README.md)
* and a lot of source code digging with no real usage examples