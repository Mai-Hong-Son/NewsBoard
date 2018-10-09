import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Alert,
    TouchableOpacity,
    Linking,
    Clipboard
} from 'react-native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import Header from '../Reusables/Header';
import { Loading } from '../Reusables/Loading';

@connect(
    state => ({
        postDetail: state.postDetail,
        saveArticleStatus: state.saveArticleStatus,
        categories: state.categories,
        shareArticleStatus: state.shareArticleStatus
    }),
    { ...commonActions }
)
export default class NewsDetail extends React.PureComponent {
    state = {
        loading: true,
        isClickSave: false,
        onClickShare: false,
        isTranslate: false,
        subContent: ''
    }

    componentDidMount() {
        const { navigation: { state: { params: { _id } } } } = this.props;

        this.props.getPostDetail(_id);
        this.props.getMyArticles();
    }

    componentWillReceiveProps(nextProps) {
        const { postDetail: { data }, saveArticleStatus: { error }, shareArticleStatus: { error: errShare } } = nextProps;

        if (data !== {}) {
            const { subcontent } = data;

            this.setState({
                loading: false,
                subContent: subcontent
            });
        }

        if (!error && this.state.isClickSave) {
            Alert.alert(
                'Thông báo',
                'Bạn đã lưu thành công',
                [
                    {
                        text: 'OK',
                        onPress: () => this.setState({
                            isClickSave: false
                        })
                    }
                ],
                { cancelable: false }
            );
        }

        if (error && this.state.isClickSave) {
            Alert.alert(
                'Thông báo',
                'Bài này đã được lưu',
                [
                    {
                        text: 'OK',
                        onPress: () => this.setState({
                            isClickSave: false
                        })
                    }
                ],
                { cancelable: false }
            );
        }

        if (!errShare && this.state.onClickShare) {
            Alert.alert(
                'Thông báo',
                'Bạn đã chia sẻ thành công',
                [
                    {
                        text: 'OK',
                        onPress: () => this.setState({
                            onClickShare: false
                        })
                    }
                ],
                { cancelable: false }
            );
        }

        if (errShare && this.state.onClickShare) {
            Alert.alert(
                'Thông báo',
                'Bài này đã được chia sẻ',
                [
                    {
                        text: 'OK',
                        onPress: () => this.setState({
                            onClickShare: false
                        })
                    }
                ],
                { cancelable: false }
            );
        }
    }

    onSaveAricle = () => {
        const { navigation: { state: { params: { _source, _id } } } } = this.props;
        const {
            body,
            lang,
            domain,
            logo,
            image,
            url,
            time,
            collected_time,
            category,
            country,
            region,
            source,
            title
        } = _source;

        this.setState({
            isClickSave: true
        });

        this.props.saveArticle({
            id: _id,
            lang,
            title: '',
            domain,
            logo,
            image,
            url,
            time,
            collected_time,
            body,
            category,
            country,
            region,
            source
        });
    }

    onLinking = (link) => {
        Linking.openURL(link);
    }

    onShare = (priority, shares) => {
        const { postDetail: { data: { id, collected_time, domain, logo } } } = this.props;

        this.setState({
            onClickShare: true
        });

        this.props.shareArticle({
            id,
            title: '',
            domain,
            logo,
            collected_time,
            priority,
            shares
        });
    }

    // onTranslate = (text) => {
    //     const textChanged = text.replace(/<(?:.|\n)*?>/gm, '');

    //     this.setState({
    //         isTranslate: true
    //     }, () => {
    //         fetch(`https://api.mymemory.translated.net/get?q=${textChanged}&langpair=vi|en`)
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 const { responseData: { translatedText } } = responseJson;

    //                 this.setState({
    //                     subContent: textChanged === '' ? '' : translatedText,
    //                     isTranslate: false
    //                 });
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     });
    // }

    writeToClipboard = async (text) => {
        await Clipboard.setString(text);
    };

    render() {
        const { loading, subContent } = this.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Header
                        title=''
                        type='stack'
                        navigation={navigation}
                        iconName='flag'
                        onPress={this.onSaveAricle}
                        isSave={this.props.saveArticleStatus.isSave}
                    />
                    <Loading />
                </View>
            );
        }

        const { postDetail: { data: { body, domain, title, logo, time, category, url, image } }, navigation, categories } = this.props;
        const categoryName = categories.data.find(it => it._id === category);

        return (
            <View style={styles.container}>
                <Header
                    title=''
                    type='stack'
                    navigation={navigation}
                    iconName='flag'
                    iconMenu
                    onPress={this.onSaveAricle}
                    onShare={(priority, shares) => this.onShare(priority, shares)}
                    // onTranslate={() => this.onTranslate(subcontent)}
                    onCopy={() => this.writeToClipboard(url)}
                />
                <View style={{ overflow: 'hidden' }}>
                    <ParallaxScrollView
                        keyboardShouldPersistTaps="always"
                        maskColor="transparent"
                        parallaxHeaderHeight={250}
                        renderBackground={() => (<Image source={{
                            uri: image === undefined ? '' : image,
                            height: 250
                        }} />)}
                    >
                        <View style={styles.wrapContentStyle}>
                            <Text style={styles.titleStyle}>{title}</Text>
                            <View style={styles.wrapSourceStyle}>
                                <Image style={styles.logoImage} source={{ uri: logo }} />
                                <TouchableOpacity onPress={() => (url === null ? null : this.onLinking(url))}>
                                    <Text style={{ color: 'blue', paddingLeft: 10, fontSize: Scale.getSize(16) }}>{domain}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.txtSourceStyle}>{time}</Text>
                            <View style={styles.wrapTag}>
                                <Text style={styles.txtName}>{categoryName.name}</Text>
                            </View>
                            <Text style={styles.txtSubContentStyle}>{subContent.replace(/<(?:.|\n)*?>/gm, '')}</Text>
                            <HTML
                                html={body}
                                imagesMaxWidth={platform.deviceWidth - 100}
                                baseFontStyle={{ fontSize: Scale.getSize(25) }}
                                tagsStyles={{
                                    p: {
                                        paddingTop: Scale.getSize(10),
                                        paddingBottom: Scale.getSize(10),
                                        color: '#000'
                                    },
                                    img: { overflow: 'visible' },
                                    div: { alignItems: 'center' }
                                }}
                            />
                        </View>
                    </ParallaxScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: Scale.getSize(27),
        fontWeight: '700',
        color: '#000'
    },
    wrapContentStyle: {
        width: platform.deviceWidth,
        paddingHorizontal: Scale.getSize(15),
        paddingTop: Scale.getSize(15)
    },
    wrapSourceStyle: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    logoImage: {
        height: Scale.getSize(18),
        width: Scale.getSize(18)
    },
    txtSourceStyle: {
        fontSize: Scale.getSize(16),
        color: 'rgb(137,137,137)',
        paddingVertical: 5
    },
    txtSubContentStyle: {
        fontSize: Scale.getSize(25),
        fontWeight: '600',
        color: '#000'
    },
    wrapTag: {
        padding: Scale.getSize(5),
        marginVertical: Scale.getSize(5),
        borderRadius: 5,
        backgroundColor: '#cc0099',
        width: 80,
        alignItems: 'center'
    },
    txtName: {
        color: '#fff',
        fontWeight: '700'
    }
});
