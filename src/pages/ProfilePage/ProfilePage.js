import './ProfilePage.scss';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useState } from 'react';
import Button from 'components/Button/Button';
import LeftNav from 'components/LeftNav/LeftNav';

const ProfilePage = ({ user }) => {
  const [email, setEmail] = useState(user.attributes.email || '');
  const [givenName, setGivenName] = useState(
    user.attributes['custom:first_name'] || ''
  );
  const [familyName, setFamilyName] = useState(
    user.attributes['custom:last_name'] || ''
  );

  // Company
  const [company, setCompany] = useState(
    user.attributes['custom:company'] || ''
  );
  const [companyRole, setCompanyRole] = useState(
    user.attributes['custom:company_role'] || ''
  );
  const [companyLocation, setCompanyLocation] = useState(
    user.attributes['custom:company_location'] || ''
  );

  const [emailNotifications, setEmailNotifications] = useState(
    user.attributes.email_notificaitons || false
  );

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    const attributes = [
      new CognitoUserAttribute({
        Name: 'custom:first_name',
        Value: givenName,
      }),
      new CognitoUserAttribute({
        Name: 'custom:last_name',
        Value: familyName,
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),

      new CognitoUserAttribute({
        Name: 'custom:company',
        Value: company,
      }),
      new CognitoUserAttribute({
        Name: 'custom:company_role',
        Value: companyRole,
      }),
      new CognitoUserAttribute({
        Name: 'custom:company_location',
        Value: companyLocation,
      }),
    ];

    user.updateAttributes(attributes, (error, results) => {
      if (error) {
        console.error(error);
        if (error.message) {
          alert(error.message);
        }
      } else {
        console.log(results);
      }
    });

    if (oldPassword && newPassword) {
      user.changePassword(oldPassword, newPassword, (error, result) => {
        if (error) {
          console.error(error);
          if (error.message) {
            alert(error.message);
          }
        } else {
          console.log(result);
          alert('Password updated successfully.');
        }
      });
    } else if (newPassword && oldPassword === '') {
      alert('Please enter your old password to change your password');
    }
  };

  function signOut(event) {
    event.preventDefault();
    user.signOut();
    window.location.reload(false);
  }

  return (
    <>
      <LeftNav showMenu='true'></LeftNav>

      <div className='profile-page with-side-nav'>
        <div className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column'>
                <h1 className='mb-6'>Profile</h1>
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className='form-section'>
                <h3>Your Details</h3>
                <hr />

                <div className='columns'>
                  <div className='column is-4-desktop is-offset-3-desktop'>
                    <div className='field'>
                      <label htmlFor='givenName'>First Name</label>
                      <input
                        className='input'
                        type='text'
                        value={givenName}
                        onChange={(e) => setGivenName(e.target.value)}
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='familyName'>Last Name</label>
                      <input
                        className='input'
                        type='text'
                        value={familyName}
                        onChange={(e) => setFamilyName(e.target.value)}
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='email'>Email</label>
                      <input
                        className='input'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='form-section'>
                <h3>Change Password</h3>
                <hr />

                <div className='columns'>
                  <div className='column is-4-desktop is-offset-3-desktop'>
                    <div className='field'>
                      <label htmlFor='password'>Old Password</label>
                      <input
                        className='input'
                        type='password'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='password'>New Password</label>
                      <input
                        className='input'
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='form-section'>
                <h3>Company Details</h3>
                <hr />

                <div className='columns'>
                  <div className='column is-4-desktop is-offset-3-desktop'>
                    <div className='field'>
                      <label htmlFor='company'>Company</label>
                      <input
                        className='input'
                        type='text'
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='role'>Role</label>
                      <input
                        className='input'
                        type='text'
                        value={companyRole}
                        onChange={(e) => setCompanyRole(e.target.value)}
                      />
                    </div>

                    <div className='field'>
                      <label htmlFor='role'>Location</label>
                      <input
                        className='input'
                        type='text'
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='form-section'>
                <h3>Session</h3>
                <hr />

                <div className='columns'>
                  <div className='column is-4-desktop is-offset-3-desktop'>
                    <button className='button' onClick={(e) => signOut(e)}>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              <hr />

              <div className='columns'>
                <div className='column is-4-desktop is-offset-3-desktop'>
                  <Button>Save</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
