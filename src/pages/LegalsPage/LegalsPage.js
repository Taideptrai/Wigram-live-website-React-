import './LegalsPage.scss';
import LeftNav from 'components/LeftNav/LeftNav';

const LegalsPage = () => {
  return (
    <>
      <LeftNav showMenu='true'></LeftNav>
      <div className='legals-page with-side-nav'>
        <div className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-half'>
                <h1 className='mb-6'>Legals</h1>

                <h2>About</h2>
                <p>
                  Suspendisse massa aliquet nec et fusce id suspendisse amet.
                  Cras gravida tortor vitae faucibus egestas ornare ac.
                </p>
                <p>
                  Et pharetra nullam hendrerit pellentesque velit, pulvinar eget
                  amet nec. Risus amet viverra diam ante. Vestibulum, vestibulum
                  lectus ipsum sit mattis. Donec netus mauris pharetra non cras.
                </p>
                <p>
                  Venenatis dui mi tortor scelerisque nullam mauris. Gravida
                  mauris sapien, lacus ut sit sed. Commodo senectus nisl non
                  quisque potenti in diam. Nisl sodales elit sed sollicitudin
                  aliquam.
                </p>

                <h2>Privacy</h2>
                <p>
                  Suspendisse massa aliquet nec et fusce id suspendisse amet.
                  Cras gravida tortor vitae faucibus egestas ornare ac.
                </p>
                <p>
                  Et pharetra nullam hendrerit pellentesque velit, pulvinar eget
                  amet nec. Risus amet viverra diam ante. Vestibulum, vestibulum
                  lectus ipsum sit mattis. Donec netus mauris pharetra non cras.
                </p>
                <p>
                  Venenatis dui mi tortor scelerisque nullam mauris. Gravida
                  mauris sapien, lacus ut sit sed. Commodo senectus nisl non
                  quisque potenti in diam. Nisl sodales elit sed sollicitudin
                  aliquam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LegalsPage;
