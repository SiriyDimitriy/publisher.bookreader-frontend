import React from 'react';
import PageHeader from './PageHeader/index';
import Paragraph from './Paragraph/index';
import Media from './Media/index';
import Page from '../../common/Page';
import DnD from '../../common/DnD';

export default class BookPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            changePageHeader,
            bookId,
            changePageParagraph,
            selectMedia,
            removeMedia,
            dndOrder
        } = this.props;
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
                            <DnD
                                key={'header' + el.id}
                                index={el.order}
                                id={el.id}
                                text={el.text}
                                markerElemType='headers'
                                pageNumber={pageNumber}
                                dndOrder={dndOrder}
                            >
                                <PageHeader
                                    bookId={bookId}
                                    header={el}
                                    key={i}
                                    changePageHeader={changePageHeader}
                                    pageNumber={pageNumber}
                                />
                            </DnD>
                        );
                    }
                    if (el.hasOwnProperty('paragraph')) {
                        return (
                            <DnD
                                key={'paragraph' + el.id}
                                index={el.order}
                                id={el.id}
                                text={el.text}
                                markerElemType='paragraphs'
                                pageNumber={pageNumber}
                                dndOrder={dndOrder}
                            >
                                <Paragraph
                                    bookId={bookId}
                                    paragraph={el}
                                    key={i}
                                    changePageParagraph={changePageParagraph}
                                    pageNumber={pageNumber}
                                />
                            </DnD>
                        );
                    }
                    if (el.hasOwnProperty('image')) {
                        return (
                            <DnD
                                key={'image' + el.id}
                                index={el.order}
                                id={el.id}
                                text={el.text}
                                markerElemType='images'
                                pageNumber={pageNumber}
                                dndOrder={dndOrder}
                            >
                                <Media
                                    image={el}
                                    key={i}
                                    bookId={bookId}
                                    pageNumber={pageNumber}
                                    removeMedia={removeMedia}
                                    selectMedia={selectMedia}
                                />
                            </DnD>
                        );
                    }
                })}
            </Page>
        );
    }
}
