import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';
import Button from '../Buttons/Button';

const AlertModal = ({ children, open, setOpen, headerText, HeaderIcon }) => {
  const [t] = useTranslation();
  return (
    <div>
      <div
        className={`${
          open ? '' : 'invisible'
        } overflow-y-auto overflow-x-hidden fixed flex right-0 left-0 z-50 justify-center items-center md:inset-0 sm:h-full bg-black bg-opacity-60`}
      >
        <div className='px-4 w-full max-w-4xl h-full md:h-auto'>
          <div className='flex flex-col bg-white rounded-lg p-6 gap-12 drop-shadow-lg'>
            <div className='flex flex-wrap justify-between'>
              <div className='flex flex-row gap-2'>
                {HeaderIcon && <HeaderIcon className='h-6 text-primary' />}
                <h6 className='text-xl font-semibold self-end'>{headerText}</h6>
              </div>
              <XIcon
                className='h-6 text-secondary cursor-pointer'
                onClick={() => setOpen(false)}
              />
            </div>
            <div className='flex justify-between items-center'>{children}</div>
            <div className='flex flex-row gap-4 justify-end'>
              <Button
                text={t('modal.ok')}
                type='primary'
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
