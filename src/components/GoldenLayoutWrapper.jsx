import GoldenLayout from 'golden-layout'
import App from './LinerChart/App'
import AppMonitor from './Monitor/components/App'

class GoldenLayoutWrapper extends React.Component {

    componentDidMount() {
        // Build basic golden-layout config
        const config = {
            content: [{
                type: 'row',
                content:[{
                    type:'react-component',
                    component: 'App',
                },
                {
                    type:'react-component',
                    component: 'AppMonitor',
                }]
            }]
        };

        function wrapComponent(Component, store) {
            class Wrapped extends React.Component {
                render() {
                    return (
                        <Component {...this.props}/>
                    );
                }
            }
            return Wrapped;
        };
        var layout = new GoldenLayout(config, this.layout);
        layout.registerComponent('App',
                                 wrapComponent(App)
        );
        layout.registerComponent('AppMonitor',
                                 wrapComponent(AppMonitor)
        );
        layout.init();

        window.addEventListener('resize', () => {
            layout.updateSize();
        });
    }

    render() {
        return (
            <div className='goldenLayout' ref={input => this.layout = input}/>
        );
    }
}

// ContextTypes must be defined in order to pass the redux store to exist in
// "this.context". The redux store is given to GoldenLayoutWrapper from its
// surrounding <Provider> in index.jsx.
GoldenLayoutWrapper.contextTypes = {
    store: React.PropTypes.object.isRequired
};


export default GoldenLayoutWrapper;
