import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from './styles.module.scss';

const ANIMATION_TIME = 300;

function NotificationBox(props) {
    const style = typeof props.style === 'object' ? props.style : {};

    return (
        <div
            className={classnames(
                styles['notice'],
                styles['closable'],
                styles['fade-enter']
            )}
            style={style}
        >
            <div className={styles['content']}>
                <div className={classnames({
                    [styles['with-icon']]: props.icon})}>
                    {props.icon && (
                        <i className={classnames(styles['icon'], props.icon, styles[props.icon])} />
                    )}
                    <div className={styles['message']}>
                        {props.title}
                    </div>
                    <div className={styles['description']}>
                        {props.content}
                    </div>
                </div>
            </div>
            <a className={styles['close']} onClick={props.onClickRemove}>
                <i className='icon-close' />
            </a>
        </div>
    );
}

const defaultProps = {
    duration: 4500,
    style: {},
    title: '',
    content: '',
    placement: 'topRight'
};

export class notification {
    static container = {};

    static getContainer(placement) {
        if (!(this.container && this.container[placement])) {
            const rootElement = document.getElementById('root');

            const container = document.createElement('div');

            const div = document.createElement('div');

            div.classList.add(styles['notification-box'], styles[placement]);

            const span = document.createElement('span');

            div.appendChild(span);

            container.appendChild(div);

            rootElement.appendChild(container);

            this.container[placement] = span;
        }

        return this.container[placement];
    }

    static success(props = defaultProps) {
        return this.open({
            ...props,
            icon: 'icon-success-green'
        });
    }

    static error(props = defaultProps) {
        return this.open({
            ...props,
            icon: 'icon-error-red'
        });
    }

    static warn(props = defaultProps) {
        return this.open({
            ...props,
            icon: 'icon-warning'
        });
    }

    static open(props = defaultProps) {
        const placement = props.hasOwnProperty('placement') ? props.placement : defaultProps.placement;
        const duration = props.hasOwnProperty('duration') ? props.duration : defaultProps.duration;

        let newElement = document.createElement('div');
        const container = this.getContainer(placement);
        let closed = false;

        ReactDOM.render((
            NotificationBox({
                ...props,
                onClickRemove: () => close(newElement, container)
            })
        ), newElement, () => {
            container.appendChild(newElement);

            if (duration) {
                // Auto close
                setTimeout(() => {
                    close(newElement, container);
                }, duration);
            }
        });

        function close (el, container) {
            if (closed || !(el && el.childNodes && el.childNodes.length)) {
                return;
            }

            // Avoid call twice
            closed = true;

            el.childNodes[0].classList.add(styles['fade-leave']);

            setTimeout(() => {
                if (el) {
                    container.removeChild(el);
                    ReactDOM.unmountComponentAtNode(el);
                    el.remove();
                }

            }, ANIMATION_TIME);
        }
    }
}

NotificationBox.defaultProps = defaultProps;

export default NotificationBox;
