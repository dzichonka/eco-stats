import { use, useState } from 'react';
import EmissionsTable from '@/components/EmissionsTable/EmissionsTable';
import { getEmissions } from '@/resources/getEmissions';
import { IoMdSettings } from 'react-icons/io';
import { ColumnsModal } from '../ColumnsModal/ColumnsModal';
import Modal from '../Modal/Modal';

const EmissionsList = () => {
  const data = use(getEmissions());
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="section">
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <ColumnsModal />
      </Modal>
      <div className="self-end">
        <button
          className="btn-icon text-2xl"
          onClick={() => setIsOpenModal(true)}
        >
          <IoMdSettings />
        </button>
      </div>
      <EmissionsTable data={data} />
    </div>
  );
};

export default EmissionsList;
