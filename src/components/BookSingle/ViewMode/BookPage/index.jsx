import React from 'react';
import PageHeader from './PageHeader/index';
import Paragraph from './Paragraph/index';
import Media from './Media/index';
import Page from '../../../common/Page';

export default class BookPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {headers, paragraphs, images, pageNumber} = this.props.page;

        let elements = [];
        elements.push.apply(elements, headers);
        elements.push.apply(elements, paragraphs);
        elements.push.apply(elements, images);

        const sortedElements = elements.sort((a, b) => {
            return a.order - b.order;
        });

        return (
            <Page>
                {sortedElements.map((el, i) => {
                    if (el.hasOwnProperty('header')) {
                        return (
                            <PageHeader
                                header={el}
                                key={i}
                            />
                        );
                    }
                    if (el.hasOwnProperty('paragraph')) {
                        return (
                            <Paragraph
                                paragraph={el}
                                key={i}
                            />
                        );
                    }
                    if (el.hasOwnProperty('image')) {
                        return (
                            <Media
                                image={el}
                                key={i}
                            />
                        );
                    }
                })}
            </Page>
        );
    }
}
