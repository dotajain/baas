import React from 'react';
import legacyModernization from '../../../../assets/images/legacyModernization.png';

const LegacyModernization = () => (
  <section className="section" id="legacyModernization">
    <div className="container">
      <div className="row align-items-center">
        
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">Legacy Modernization</h2>
            <p>
              SynBaaS helps in Legacy to Cloud Native Transformation. It helps in <strong>incremental modernization of legacy applications</strong> to minimize risk during transition. During multi-year transition phase it helps in co-existence of existing modules and new services.
            </p>
          </div>
        </div>
        <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={legacyModernization} alt="" />
            </div>
        </div>
      </div>
    </div>
  </section>
);

export default LegacyModernization;